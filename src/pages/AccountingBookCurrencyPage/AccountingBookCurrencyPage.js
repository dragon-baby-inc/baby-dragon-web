import React, { useState, useContext } from "react";
import { Context as AuthContext } from "../../contexts/AuthContext";
import { useParams } from "react-router-dom";
import { dragonBabyApi } from "../../api/dragonBabyApi";
import { themeColors } from "../../constants";
import { useHistory, useAccountingBook, useCurrencySelect } from "../../hooks";
import {
  Separater,
  PageHeader,
  Backdrop,
  UserForm,
  TopRightIcon,
} from "../../components";

const AccountingBookCurrencyPage = (props) => {
  const { state: authState } = useContext(AuthContext);
  /* eslint-disable no-unused-vars */
  const [users, accountingBookDetails, loading] = useAccountingBook(authState);
  const history = useHistory();
  const { group_id, accounting_book_id } = useParams();
  const [showForm, setShowForm] = useState(false);
  const sendUpdateRequest = () => {
    authState.api
      .updateAccountingBook(group_id, accounting_book_id, {
        currency: currency,
      })
      .then((res) => {
        history.navigateTo("accountingBookSettingsPage", {
          group_id,
          accounting_book_id,
        });
      })
      .catch((res) => {
        window.location.reload();
      });
  };

  const [currency, select] = useCurrencySelect({
    initialValue: accountingBookDetails.currency,
  });

  return (
    <>
      <div style={styles.bg}>
        <PageHeader
          faicon="faChevronLeft"
          link={`/liff_entry/groups/${accountingBookDetails.group_id}/accounting_books/${accounting_book_id}/settings`}
          color={themeColors.black}
        >
          選擇幣別
        </PageHeader>

        <TopRightIcon
          clicked={sendUpdateRequest}
          style={{ fontSize: "20px", right: "20px", color: "black" }}
        >
          <div> 更新 </div>
        </TopRightIcon>

        <Separater style={{ margin: "0px" }} />
        {loading ? null : select}
        {showForm ? (
          <>
            <UserForm />
            <Backdrop icon="faTimes" clicked={() => setShowForm(false)} />
          </>
        ) : null}
      </div>
    </>
  );
};

const styles = {
  textInput: {
    textAlign: "right",
    fontSize: "15px",
  },
  label: {
    minHeight: "55px",
    cursor: "pointer",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "15px 30px",
    borderBottom: "1px solid #eee",
  },
  description: {
    fontSize: "15px",
  },
  bg: {
    width: "100%",
    height: "100vh",
    overflow: "hidden",
    maxHeight: "-webkit-fill-available",
    position: "relative",
  },
  h1: {
    padding: "12px",
    textAlign: "center",
    fontSize: "1.5rem",
  },
  dateSeparator: {
    fontSize: "12px",
    textAlign: "center",
    padding: "5px",
    color: themeColors.gray600,
  },
  label: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default AccountingBookCurrencyPage;
