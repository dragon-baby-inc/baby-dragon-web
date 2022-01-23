import React, { useState, useContext } from "react"
import { Context as AuthContext } from '../contexts/AuthContext'
import { useParams } from 'react-router-dom';
import { themeColors } from '../constants'
import { normalizeGroupUser } from '../normalizers'
import { useHistory, useAccountingBook, useDefaultUsersSelect } from '../hooks'
import {
  Warning,
  UserConfirmBox,
  Separater,
  PageHeader,
  Backdrop,
  FullPageLoader,
  Loading,
  UserForm,
  TopRightIcon,
} from '../components'
import {
  createUserCheckbokLabel
} from '../generators/labelGenerator'

const AccountingBookUsersPage = (props) => {
  const history = useHistory();
  /* eslint-disable no-unused-vars */
  const { state: authState } = useContext(AuthContext)
  const [users, accountingBookDetails, loading, _err, setUsers] = useAccountingBook(authState)
  const { group_id, accounting_book_id } = useParams();
  const [showForm, setShowForm] = useState(false)
  const [fullPageLoad, setFullPageLoad] = useState(false)

  const buildSelectUsers = (users) => {
    return users.filter((u) => u.coverCost).map((u) => u.id)
  }

  const [editBoxActive, setEditBoxActive] = useState(false)
  const [imageId, setImageId] = useState(0)
  const [name, setName] = useState({ value: '', valid: true })
  const [editObject, setEditObject] = useState(null)

  const resetConfirmBox = () => {
    setImageId(0)
    setName({ value: '', valid: true })
  }

  const handleEditUserCancel = () => {
    resetConfirmBox()
    setEditBoxActive(false)
  }

  const handleEditUserConfirm = (setDisableForm) => {
    if(!name.valid) {
      setDisableForm(false)
      return
    }

    let sameUser = users.filter(u => u.displayName === name.value)
    if (sameUser.length > 0) {
      if (editObject.id !== sameUser[0].id) {
        setName({ value: name.value, valid: false })
        setDisableForm(false)
        return
      }
    }

    authState.api.updateUser(group_id, editObject.id, { name: name.value, image_id: imageId })
      .then(res => {
        let _users = [...users]
        let index = _users.findIndex((u) => u.id === editObject.id)
        let newUser = _users[index]
        newUser.displayName = res.data.user.display_name
        newUser.imageURL = res.data.user.image_url
        newUser.imageId = res.data.user.image_id
        _users[index] = newUser

        setUsers(_users)
        resetConfirmBox()
        setEditBoxActive(false)
      }).catch(err => {
        console.log(err)
        setEditBoxActive(false)
      })
  }

  const handleUserEdit = (e, object) => {
    setEditObject(object)
    if (object.imageId) {
      setImageId(object.imageId)
    } else {
      setImageId(0)
    }
    setName({ value: object.displayName, valid: true })
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
        setUsers(_users)
      }).catch(err => {
        console.log(err)
      })
    e.preventDefault()
  }

  const filterDisabled = (users) => {
    return users.filter(u => u.restrictedCoverCost)
  }


  const [value, select] = useDefaultUsersSelect({
    users,
    buildSelectUsers,
    createLabel: createUserCheckbokLabel,
    filterDisabled,
    handleAddUser: () => { setCreateBoxActive(true) },
    selectAll: true,
    handleEdit: handleUserEdit,
    handleTrash: handleUserDelete,
    labelsHeight: "calc(100% - 44px - 1px - 58px - 36px)"
  })

  const updateCoverCostUsers = () => {
    setFullPageLoad(true)
    authState.api.updateCoverCostUsers(group_id, accounting_book_id, value)
      .then((res) => {
        setFullPageLoad(false)
        history.navigateTo("accountingBookSettingsPage", { group_id, accounting_book_id })
      })
      .catch((res) => {
        setFullPageLoad(false)
        window.location.reload();
      })
  }

  const _styles = {
    root: {
      backgroundColor: 'white',
      margin: 0,
      padding: '0px 22vw',
      overflow: 'hidden',
    },
  };

  const handleCreateUserConfirm = (setDisableForm) => {
    if (name.value.length < 1) {
      setName({ value: name.value, valid: false })
      setDisableForm(false)
      return
    }

    let sameUser = users.filter(u => u.displayName === name.value)
    if (sameUser.length > 0) {
      setName({ value: name.value, valid: false })
      setDisableForm(false)
      return
    }

    authState.api.createUser(group_id, { name: name.value, image_id: imageId })
      .then(res => {
        let _users = [...users]
        _users.push(
          {
            ...normalizeGroupUser(res.data.user),
            coverCost: true
          }
        )
        setUsers(_users)
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
    userName={name}
    setUserName={setName}
    imageUserId={imageId}
    setUserImageId={setImageId}
  />

  const editUserConfirmBox = <UserConfirmBox
    confirmed={handleEditUserConfirm}
    canceled={handleEditUserCancel}
    title='編輯虛擬成員'
    userName={name}
    setUserName={setName}
    imageUserId={imageId}
    setUserImageId={setImageId}
  />

  return(
    <>
      <div style={styles.bg}>
        <PageHeader
          faicon='faChevronLeft'
          link={`/liff_entry/groups/${group_id}/accounting_books/${accounting_book_id}/settings`}
          color={themeColors.black}>
          分帳成員
        </PageHeader>

        <TopRightIcon
          clicked={updateCoverCostUsers}
          style={{ fontSize: '20px', right: '20px', color: 'black' }} >
          <div> 完成 </div>
        </TopRightIcon>

        <Separater style={{ margin: "0px" }}/>
        {
          loading ?
            <>
              <Loading/>
            </>
            : select
        }
      {
        showForm ?
          <>
            <UserForm />
            <Backdrop icon="faTimes" clicked={() => setShowForm(false)}/>
          </>
          : null
      }
      </div>
      { fullPageLoad ? <FullPageLoader/> : null }
      { editBoxActive ? editUserConfirmBox : null }
      { createBoxActive ? createUserConfirmBox : null }
    </>
  )
}

const styles = {
  textInput: {
    textAlign: "right",
    fontSize: "15px"
  },
  label: {
    minHeight: '55px',
    cursor: 'pointer',
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "15px 30px",
    borderBottom: "1px solid #eee",
  },
  description: {
    fontSize: "15px"
  },
  bg: {
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
    maxHeight: '-webkit-fill-available',
    position: 'relative',
  },
  h1: {
    padding: '12px',
    textAlign: 'center',
    fontSize: '1.5rem',
  },
  dateSeparator: {
    fontSize: '12px',
    textAlign: 'center',
    padding: '5px',
    color: themeColors.gray600,
  },
  label: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  swapView: {
    backgroundColor: 'white',
    width: '100%',
  }
}

export default AccountingBookUsersPage
