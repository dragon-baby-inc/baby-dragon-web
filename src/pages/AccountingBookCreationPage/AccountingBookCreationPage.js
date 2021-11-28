import React, { useState, useContext, useEffect } from "react"
import { useUsers } from '../../hooks'
import { themeColors, imageUrls } from '../../constants'
import { Context as AccountingBookContext} from '../../contexts/AccountingBookContext.js'
import {
  Image,
  StepsWidget,
  TopRightIcon,
  IconSwappableView,
  PageHeader,
  FontAwesomeIcon,
  Separater,
  SeparaterLabel,
  TextInput,
  Loading,
  CheckboxSelect,
  CheckboxLabel,
  CircleFloatingIcon,
} from '../../components'
import {
  useHistory,
  useAccountingBook,
  useCurrencySelect
} from '../../hooks'
import { useParams } from 'react-router-dom';
import { dragonBabyApi } from '../../api/dragonBabyApi'

const AccountingBookEditPage = (props) => {
  /* eslint-disable no-unused-vars */
  const [pageLoading, setPageLoading] = useState(true)
  const history = useHistory();
  const { group_id, accounting_book_id } = useParams()
  const [currentStep, setCurrentStep] = useState(0)
  const [selectObjectIds, setSelectObjectIds] = useState([])
  const [users, userLoading] = useUsers()

  const handleCoverCostUser = (objects) => {
    let selectedIds = objects.map(obj => obj.id)
    setUsers({ value: selectedIds, valid: selectedIds.length > 0})
    setSelectObjectIds(selectedIds)
  }

  useEffect(() => {
    let selectedIds = users.map(obj => obj.id)
    setUsers({ value: selectedIds, valid: selectedIds.length > 0})
    setSelectObjectIds(selectedIds)
  }, [users])

  const {
    state,
    resetContext,
    setUsers,
    setCurrency,
    setImageId,
    setName,
    setAutoDetectPayment,
    validateForm,
    setLineNotification
  } = useContext(AccountingBookContext)

  const [currency, currencySelect] = useCurrencySelect({
    initialValue: null,
    callback: (currency) => setCurrency({ value: currency, valid: true  })
  })

  useEffect(() => {
    resetContext()
    setImageId(0)
  }, [])

  const updateAccountingBook = () => {
    validateForm(state, ['name', 'imageId', 'currency'])
    if (!state.formValid) { return }

    dragonBabyApi.createAccountingBook(group_id, buildParams())
      .then((res) => {
        history.navigateTo("paymentIndexPage", { group_id, accounting_book_id })
      })
  }

  const buildParams = () => {
    return {
      name: state.name.value,
      image_id: state.imageId.value,
      currency: state.currency.value,
      users: state.users.value
    }
  }

  const handlInputChange = (value) => {
    setName({ name: value, valid: value.length > 0 })
  }

  const createUserLabel = ({ object, handleChange, selectedObjects }) => {
    return <CheckboxLabel
      key={object.id}
      object={object}
      changed={handleChange}
      value={object.id}
      checked={selectedObjects.map(el => el.id).includes(object.id)} >
      <div style={styles.label}>
        <Image style={{ paddingRight: '12px' }} imageUrl={object.imageURL}/>
        {object.displayName}
      </div>
    </CheckboxLabel>
  }

  const steps = [
    {
      name: "為帳本命名吧",
      component: <>
        <div style={styles.swapView}>
          <IconSwappableView
            changed={setImageId}
            initial={state.imageId.value}
            icons={imageUrls}/>
        </div>
        <div>
          <TextInput
            key='name'
            disabled={false}
            placeholder={'輸入名稱'}
            name={'名稱'}
            labelStyle={styles.labelStyle}
            changed={(value) => handlInputChange(value)}
            value={state.name.value === undefined ? '' : state.name.value}
            valid={state.name.valid}
            invalidFeedback="*不可為空白，12字內"
            type='text'
          />
        </div>
      </>
    },
    {
      name: "選擇分帳成員",
      component: <div style={styles.select}>
          <CheckboxSelect
            createLabel={createUserLabel}
            objects={users}
            selected_object_ids={state.users.value}
            changed={handleCoverCostUser}/>
        </div>
    },
    {
      name: "選擇幣別",
      component: <div style={styles.select}>
        {currencySelect}
      </div>
    },
  ]

  return(
    <>
      <div style={styles.bg}>
        <TopRightIcon
          clicked={() => {history.navigateTo("accountingBookPage", { group_id })}}
          style={{ fontSize: '20px', right: '20px', color: 'black' }} >
          <div> 取消 </div>
        </TopRightIcon>

        <PageHeader
          faicon='faChevronLeft'
          link={history.routes["accountingBookPage"]({group_id})}
          color="black">
          建立新帳本
        </PageHeader>
        <Separater style={{ margin: "0px" }}/>
        <div style={styles.stepName}>
          {steps[currentStep].name}
        </div>
        <StepsWidget height={'calc(100vh - 58px - 70px)'} index={currentStep} steps={steps}/>
      </div>
      {
        currentStep === 0 ?
          null:
          <CircleFloatingIcon
            faicon='faChevronLeft'
            faColor={themeColors.white}
            clicked={() => { setCurrentStep(currentStep - 1) }}
            iconInlineStyle={{background: 'none', background: 'linear-gradient(92.29deg, #103C2B 0%, #07694D 100%)'}}
            containerInlineStyle={{ left: '30px', bottom: '30px'}}/>
      }
      {
        currentStep === steps.size - 1 ?
          null:
          <CircleFloatingIcon
            faicon='faChevronRight'
            faColor={themeColors.white}
            clicked={() => { setCurrentStep(currentStep + 1) }}
            iconInlineStyle={{background: 'none', background: 'linear-gradient(92.29deg, #103C2B 0%, #07694D 100%)'}}
            containerInlineStyle={{ right: '30px', bottom: '30px'}}/>
      }
    </>
  )
}

const styles = {
  bg: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    maxHeight: '-webkit-fill-available',
    position: 'relative',
  },
  labelStyle: {
    padding: '20px'
  },
  label: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepName: {
    paddingTop: '27px',
    paddingBottom: '18px',
    width: '100%',
    display: 'block',
    fontSize: '18px',
    textAlign: 'center',
    lineHeight: '25px',
    fontWeight: '700',
  },
  select: {
    backgroundColor: themeColors.gray100,
    margin: "0px 20px",
    borderRadius: "16px",

  }
}

export default AccountingBookEditPage
