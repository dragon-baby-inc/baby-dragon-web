import React, { useState, useContext, useEffect } from "react"
import { useUsers } from '../../hooks'
import _styles from './AccountingBookCreationPage.module.scss'
import { themeColors, imageUrls } from '../../constants'
import { Context as AccountingBookContext} from '../../contexts/AccountingBookContext.js'
import {
  Warning,
  Footer,
  Image,
  StepsWidget,
  TopRightIcon,
  CircleIcon,
  IconSwappableView,
  PageHeader,
  FontAwesomeIcon,
  Separater,
  SeparaterLabel,
  FloatingIcon,
  TextInput,
  Loading,
  Button,
  CheckboxSelect,
  CheckboxLabel,
  CircleFloatingIcon,
} from '../../components'
import {
  useHistory,
  useAccountingBook,
  useUsersSelect,
  useCurrencySelect
} from '../../hooks'
import { useParams } from 'react-router-dom';
import { dragonBabyApi } from '../../api/dragonBabyApi'

const AccountingBookEditPage = (props) => {
  /* eslint-disable no-unused-vars */
  const history = useHistory();
  const [stepStates, setStepStates] = useState([
    false,
    true,
    true
  ])

  const [pageLoading, setPageLoading] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const [selectObjectIds, setSelectObjectIds] = useState([])
  const { group_id, accounting_book_id } = useParams()
  const [users, userLoading] = useUsers()
  const defaultCurrency = "TWD"
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

  const buildSelectUsers = (objects) => {
    return objects.map(obj => obj.id)
  }

  const userSelectChanged = (selectedIds) => {
    let _stepStates = [...stepStates]
    _stepStates[currentStep] = selectedIds.length > 0
    setStepStates(_stepStates)

    setUsers({ value: selectedIds, valid: selectedIds.length > 0})
  }

  const [selecteUserIds, userSelect] = useUsersSelect({
    labelsHeight: "calc(100% - 44px - 1px - 20px)",
    warning: true,
    selectAll: true,
    users,
    buildSelectUsers,
    callback: userSelectChanged,
    style: { height: '100%' }
  })

  useEffect(() => {
    resetContext()
    setImageId(0)
    setCurrency({ value: defaultCurrency, valid: true })
  }, [])

  useEffect(() => {
    if (users) {
      let selectedIds = users.map(obj => obj.id)
      setUsers({ value: selectedIds, valid: selectedIds.length > 0})
      setSelectObjectIds(selectedIds)
    }
  }, [users])


  // TODO: To be refactor
  const [currency, currencySelect] = useCurrencySelect({
    initialValue: defaultCurrency,
    callback: (currency) => setCurrency({ value: currency, valid: true  })
  })

  const updateAccountingBook = () => {
    let formValid = validateForm(state, ['name', 'users', 'imageId', 'currency'])
    if (!formValid) { return }

    dragonBabyApi.createAccountingBook(group_id, buildParams())
      .then((res) => {
        history.navigateTo("paymentIndexPage", { group_id, accounting_book_id: res.data.accounting_book.id })
      })
      .catch(err => {
        console.log(err)
      })
  }

  const buildParams = () => {
    return {
      name: state.name.value,
      image_id: state.imageId.value,
      currency: state.currency.value,
      user_ids: state.users.value
    }
  }

  const handlInputChange = (value) => {
    let _stepStates = [...stepStates]
    _stepStates[currentStep] = value.length > 0
    setStepStates(_stepStates)
    setName({ name: value, valid: value.length > 0 })
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
        <div style={styles.nameInput}>
          <TextInput
            key='name'
            faicon="farCreditCard"
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
      component:
          <div style={styles.select}>
            {userSelect}
          </div>
    },
    {
      name: "選擇幣別",
      component: <div style={styles.select}>
        {currencySelect}
      </div>
    },
  ]

  const handleNextStep = () => {
     setCurrentStep(currentStep + 1)

  }

  const handlePreviousStep = () => {
     setCurrentStep(currentStep - 1)
  }


  const currentStepValid = () => {
    return !stepStates[currentStep]
  }

  const handleSubmit = () => {
    updateAccountingBook()
  }

  return(
    <>
      <div style={styles.container}>
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
          <StepsWidget
            height={'calc(100vh - 58px - 70px - 97px - 24px)'}
            index={currentStep} steps={steps}/>
          <Footer>
            <CircleIcon
              color='green'
              faicon='faChevronLeft'
              clicked={handlePreviousStep}
              disabled={currentStep === 0}
              style={currentStep === 0 ? { opacity: 0, marginRight: '5px' }: {marginRight: '5px'}}
            />
            <Button
              clicked={handleSubmit}
              disabled={currentStep !== steps.length - 1}
              style={currentStep === steps.length - 1 ? {} : { opacity: 0 }}
            btnClass={_styles.button}>建立帳本</Button>
            <CircleIcon
              color='green'
              clicked={handleNextStep}
              disabled={currentStepValid()}
              faicon='faChevronRight'
              style={currentStep === steps.length - 1 ? { display: 'none' } : {marginLeft: '5px'}} />
          </Footer>
        </div>
      </div>

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
  nameInput: {
    margin: '40px 20px',
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
    margin: '0px 20px',
    height: '100%',
    overflow: 'auto',
    backgroundColor: themeColors.gray100,
    borderRadius: "16px",
  },
  footer: {
    height: '101px',
  }
}

export default AccountingBookEditPage
