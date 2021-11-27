import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
import axios from '../api/dragonBabyApi'
import { dragonBabyApi } from '../api/dragonBabyApi'
import { themeColors } from '../constants'
import { useAccountingBook } from '../hooks'
import {
  Image,
  Radio,
  CheckboxLabel,
  Separater,
  PageHeader,
  Backdrop,
  UserForm,
  CheckboxSelect,
  TopRightIcon
} from '../components'

const AccountingBookUsersPage = (props) => {
  const [ editMode, setEditMode ] = useState(false)
  const [users, accountingBookDetails, loading] = useAccountingBook()
  const { group_id, accounting_book_id } = useParams();
  const [selectObjectIds, setSelectObjectIds] = useState([])
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    setSelectObjectIds(users.filter((u) => u.coverCost).map((u) => u.id))
  }, [users])

  const handleCoverCostUser = (objects) => {
    setSelectObjectIds(objects.map(obj => obj.id))
  }

  const updateCoverCostUsers = () => {
    dragonBabyApi.updateCoverCostUsers(group_id, accounting_book_id, selectObjectIds)
      .then((res) => {
        console.log(res)
      })
      .catch((res) => {
        window.location.reload();
      })
  }

  const createLabel = ({ object, handleChange, selectedObjects }) => {
    return <CheckboxLabel
      key={object.id}
      object={object}
      changed={handleChange}
      value={object.id}
      checked={selectedObjects.map(el => el.id).includes(object.id)} >
      <div style={styles.label}>
        <Image style={{ paddingRight: '12px' }}/>
        {object.displayName}
      </div>
    </CheckboxLabel>
  }

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
          <div> 更新 </div>
        </TopRightIcon>

        <Separater style={{ margin: "0px" }}/>
        {
          loading ?
            null :
            <CheckboxSelect
              createLabel={createLabel}
              editMode={editMode}
              setEditMode={setEditMode}
              objects={users}
              selected_object_ids={selectObjectIds}
              changed={handleCoverCostUser}
            />
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
  }
}

export default AccountingBookUsersPage
