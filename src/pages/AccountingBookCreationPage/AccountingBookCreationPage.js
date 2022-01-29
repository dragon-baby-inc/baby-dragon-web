import React, { useState, useContext, useEffect } from "react"
import { Context as AuthContext } from '../../contexts/AuthContext'
import { useUsers } from '../../hooks'
import _styles from './AccountingBookCreationPage.module.scss'
import { themeColors, imageUrls } from '../../constants'
import { Context as AccountingBookContext} from '../../contexts/AccountingBookContext.js'
import { normalizeGroupUser } from '../../normalizers'
import {
  Svg,
  UserConfirmBox,
  Footer,
  StepsWidget,
  TopRightIcon,
  CircleIcon,
  IconSwappableView,
  PageHeader,
  Separater,
  TextInput,
  Button,
} from '../../components'
import {
  useHistory,
  useUsersSelect,
  useCurrencySelect
} from '../../hooks'
import { useParams } from 'react-router-dom';

import {
  createFreeUserCheckbokLabel
} from '../../generators/labelGenerator'

const AccountingBookEditPage = (props) => {
  const [disableForm, setDisableForm] = useState(true)
  /* eslint-disable no-unused-vars */
  const history = useHistory();
  const { state: authState } = useContext(AuthContext)
  const [stepStates, setStepStates] = useState([
    false,
    true,
    true
  ])

  const [pageLoading, setPageLoading] = useState(true)
  const [currentStep, setCurrentStep] = useState(0)
  const [selectObjectIds, setSelectObjectIds] = useState([])
  const { group_id, accounting_book_id } = useParams()
  const [users, userLoading, _setUsers, getUsers] = useUsers(authState)
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

  const [editBoxActive, setEditBoxActive] = useState(false)
  const [imageUserId, setUserImageId] = useState(0)
  const [userName, setUserName] = useState({ value: '', valid: true })

  const [editObject, setEditObject] = useState(null)
  const handleEditUserCancel = () => {
    resetConfirmBox()
    setEditBoxActive(false)
  }

  const resetConfirmBox = () => {
    setUserImageId(0)
    setUserName({ value: '', valid: true })
  }

  const handleEditUserConfirm = (setDisableForm) => {
    if(!userName.valid) {
      setDisableForm(false)
      return
    }

    let sameUser = users.filter(u => u.displayName === userName.value)
    if (sameUser.length > 0) {
      if (editObject.id !== sameUser[0].id) {
        setUserName({ value: userName.value, valid: false })
        setDisableForm(false)
        return
      }
    }

    authState.api.updateUser(group_id, editObject.id, { name: userName.value, image_id: imageUserId })
      .then(res => {
        let _users = [...users]
        let index = _users.findIndex((u) => u.id === editObject.id)
        let newUser = _users[index]
        newUser.displayName = res.data.user.display_name
        newUser.imageURL = res.data.user.image_url
        newUser.imageId = res.data.user.image_id
        _users[index] = newUser
        setUsers({ value: _users, valid: true })
        resetConfirmBox()
      }).catch(err => {
        console.log(err)
      })
    setEditBoxActive(false)
  }

  const handleUserEdit = (e, object) => {
    setEditObject(object)
    if (object.imageId) {
      setUserImageId(object.imageId)
    } else {
      setUserImageId(0)
    }

    setUserName({ value: object.displayName, valid: true })
    setEditBoxActive(true)
    e.preventDefault()
  }

  const handleUserDelete = (e, object) => {
    authState.api.deleteUser(group_id, object.id)
      .then(res => {
        console.log(res)
        let _users = [...users]
        let index = _users.findIndex((u) => u.id === object.id)
        _users.splice(index, 1)
        setUsers({ value: _users, valid: true })
        _setUsers(_users)
      }).catch(err => {
        console.log(err)
      })
    e.preventDefault()
  }

  const [selecteUserIds, userSelect] = useUsersSelect({
    labelsHeight: "calc(100% - 44px - 1px - 20px)",
    warning: true,
    handleAddUser: () => { setCreateBoxActive(true) },
    selectAll: true,
    createLabel: createFreeUserCheckbokLabel,
    users,
    handleEdit: handleUserEdit,
    handleTrash: handleUserDelete,
    buildSelectUsers,
    callback: userSelectChanged,
    style: { height: '100%' }
  })

  useEffect(() => {
    resetContext()
    setImageId(0)
    setCurrency({ value: defaultCurrency, valid: true })
    setDisableForm(false)
  }, [])

  useEffect(() => {
    if (users && selectObjectIds.length === 0) {
      let selectedIds = users.map(obj => obj.id)
      setUsers({ value: selectedIds, valid: selectedIds.length > 0})
      setSelectObjectIds(selectedIds)
    }
  }, [users])

  const handleCreateUserConfirm = (setDisableForm) => {
    if (userName.value.length < 1) {
      setUserName({ value: userName.value, valid: false })
      setDisableForm(false)
      return
    }

    let sameUser = users.filter(u => u.displayName === userName.value)
    if (sameUser.length > 0) {
      setUserName({ value: userName.value, valid: false })
      setDisableForm(false)
      return
    }

    authState.api.createUser(group_id, { name: userName.value, image_id: imageUserId })
      .then(res => {
        let _users = [...users]
        _users.push(
          normalizeGroupUser(res.data.user)
        )
        setUsers({ value: _users, valid: true })
        _setUsers(_users)
        resetConfirmBox()
        setCreateBoxActive(false)
      }).catch(err => {
        console.log(err)
        setCreateBoxActive(false)
      })
  }

  const handleCancelUserConfirm = () => {
    resetConfirmBox()
    setCreateBoxActive(false)
  }

  const [createBoxActive, setCreateBoxActive] = useState(false)
  const createUserConfirmBox = <UserConfirmBox
    confirmed={handleCreateUserConfirm}
    canceled={handleCancelUserConfirm}
    title='新增虛擬成員'
    userName={userName}
    setUserName={setUserName}
    imageUserId={imageUserId}
    setUserImageId={setUserImageId}
  />

  const editUserConfirmBox = <UserConfirmBox
    confirmed={handleEditUserConfirm}
    canceled={handleEditUserCancel}
    title='編輯虛擬成員'
    userName={userName}
    setUserName={setUserName}
    imageUserId={imageUserId}
    setUserImageId={setUserImageId}
  />

  // TODO: To be refactor
  const [currency, currencySelect, currencies] = useCurrencySelect({
    initialValue: defaultCurrency,
    callback: (currency) => setCurrency({ value: currency, valid: true  })
  })

  const createAccountingBook = () => {
    let formValid = validateForm(state, ['name', 'users', 'imageId', 'currency'])
    if (!formValid) { return }

    authState.api.createAccountingBook(group_id, buildParams())
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

  const _styles = {
    root: {
      backgroundColor: 'white',
      margin: 0,
      padding: '0px 22vw',
      overflow: 'hidden',
    },
  };

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
            svg={<Svg icon='AccountingBook' size='24' className='accountingGold'/> }
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
      name: <div>選擇 <span style={styles.nameSpan}>{state.users.value.length}位</span> 分帳成員</div>,
      component:
        <>
          <div style={styles.select}>
            {userSelect}
          </div>
        </>

    },
    {
      name: "選擇幣別",
      name: <div>選擇 <span style={styles.nameSpan}>{state.currency.value ? currencies.filter(c => c.name === state.currency.value)[0].displayName : '台幣'}</span> 作為帳款幣別</div>,
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
    createAccountingBook()
    setDisableForm(true)
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
          <Footer style={{
            position: 'absolute',
            width: '100%',
            right: 0,
            bottom: 0,
            }}>
            <CircleIcon
              color='green'
              clicked={handlePreviousStep}
              disabled={currentStep === 0}
              style={currentStep === 0 ? { opacity: 0, marginRight: '5px' }: {marginRight: '5px'}} >
              <Svg icon='leftArrow' size='24' className='strokeWhite'/>
            </CircleIcon>


            <Button
              clicked={handleSubmit}
              disabled={disableForm || currentStep !== steps.length - 1}
              style={currentStep === steps.length - 1 ? {} : { opacity: 0 }}
            btnClass={_styles.button}>建立帳本</Button>
            <CircleIcon
              color='green'
              clicked={handleNextStep}
              disabled={currentStepValid()}
              style={currentStep === steps.length - 1 ? { display: 'none' } : {marginLeft: '5px'}} >
              <Svg icon='rightArrow' size='24' className='strokeWhite'/>
            </CircleIcon>

          </Footer>
        </div>
      </div>
      { editBoxActive ? editUserConfirmBox : null }
      { createBoxActive ? createUserConfirmBox : null }
    </>
  )
}

const styles = {
  bg: {
    width: '100%',
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
  },
  swapView: {
    paddingTop: '20px'
  },
  nameSpan: {
    color: themeColors.gold700,
    fontWeight: 800,
  }
}

export default AccountingBookEditPage
