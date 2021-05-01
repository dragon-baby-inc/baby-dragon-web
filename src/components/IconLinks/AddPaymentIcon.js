import React, {useState} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/fontawesome-free-solid'

function PaymentCreateFloatingIcon({ accountingBookDetails }){
  return(
      <FloatingIcon
        link={`/liff_entry/groups/${accountingBookDetails.group_id}/accounting_books/${accountingBookDetails.id}/payments/new`}
        containerStyle={styles.floatingIcon}>
        <div style={styles.addPaymentIcon}  >
          <FontAwesomeIcon icon={faPlus} color={themeColors.white} className={styles.fa}/>
        </div>
      </FloatingIcon >
    )
}

const styles = {
  floatingIcon: {
    position: 'absolute',
    right: 20,
    bottom: 70,
    zIndex: 10,
  },
  addPaymentIcon: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50px',
    height: '50px',
    background: `linear-gradient(90deg, rgba(16,60,43,1) 0%, rgba(7,105,77,1) 100%)`,
  }
}

export default PaymentCreateFloatingIcon
