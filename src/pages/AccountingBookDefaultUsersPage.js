import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
import axios from '../api/dragonBabyApi'
import { dragonBabyApi } from '../api/dragonBabyApi'
import { themeColors, imageUrls } from '../constants'
import { useHistory, useAccountingBook, useUsersSelect } from '../hooks'
import {
  Image,
  IconSwappableView,
  TextInput,
  Radio,
  CheckboxLabel,
  Separater,
  PageHeader,
  Backdrop,
  UserForm,
  CheckboxSelect,
  TopRightIcon,
  ConfirmBox
} from '../components'

const AccountingBookUsersPage = (props) => {
  const [ editMode, setEditMode ] = useState(false)
  const history = useHistory();
  const [users, accountingBookDetails, loading] = useAccountingBook()
  const { group_id, accounting_book_id } = useParams();
  const [showForm, setShowForm] = useState(false)

  const buildSelectUsers = (users) => {
    return users.filter((u) => u.coverCost).map((u) => u.id)
  }

  const [editBoxActive, setEditBoxActive] = useState(false)
  const [imageId, setImageId] = useState(0)
  const [name, setName] = useState({ value: '', valid: true })

  const handleEditUserConfirm = () => {
    setEditBoxActive(false)
  }

  const handleUserEdit = (e, object) => {
    setName({ value: object.displayName, valid: true })
    setEditBoxActive(true)
    e.preventDefault()
  }
  const handleUserDelete = (e, object) => {
    e.preventDefault()
  }

  const [value, select] = useUsersSelect({
    users,
    buildSelectUsers,
    selectAll: true,
    handleEdit: handleUserEdit,
    handleTrash: handleUserDelete,
    labelsHeight: "calc(100% - 44px - 1px - 58px)"
  })

  const updateCoverCostUsers = () => {
    dragonBabyApi.updateCoverCostUsers(group_id, accounting_book_id, value)
      .then((res) => {
        history.navigateTo("accountingBookSettingsPage", { group_id, accounting_book_id })
      })
      .catch((res) => {
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

  return(
    <>
      <div style={styles.bg}>
        <PageHeader
          faicon='faChevronLeft'
          link={`/liff_entry/groups/${accountingBookDetails.group_id}/accounting_books/${accounting_book_id}/settings`}
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
            null : select
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
      {
        editBoxActive ?  <ConfirmBox title="編輯虛擬使用者" confirmed={handleEditUserConfirm} canceled={() => setEditBoxActive(false)}>
            <div style={styles.swapView}>
              <IconSwappableView
                imageSize="80px"
                styles={_styles}
                changed={setImageId}
                initial={imageId}
                icons={imageUrls}/>
              <div style={{ padding: '24px 16px' }}>
                <TextInput
                  key='name'
                  faicon="farCreditCard"
                  disabled={false}
                  placeholder={'輸入名稱'}
                  name={'名稱'}
                  style={{ width: '100%', margin: '0px' }}
                  changed={(value) => setName({ value: value, valid: value.length > 0 })}
                  value={name.value === undefined ? '' : name.value}
                  valid={name.valid}
                  invalidFeedback="*不可為空白，12字內"
                  type='text'
                />
              </div>
            </div>
          </ConfirmBox>  : null
      }
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
    width: '100vw',
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
