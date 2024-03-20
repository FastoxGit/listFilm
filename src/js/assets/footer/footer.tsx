import * as React from "react";
import { useState } from "react";

// COMPONENTS
import TermsUse from "./termsUse.tsx";
import UserContact from "./userContact.tsx";

function Footer() {

  const [open, setOpen] = useState(false);
  const [openUserContact, setOpenUserContact] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenUserContact = () => {
    setOpenUserContact(true);
  }

  const handleClose = (e, action) => {
    if (action !== "backdropClick") {
        setOpen(false);
    }
  };

  const handleCloseUserContact = (e, action) => {
    if (action !== "backdropClick") {
        setOpenUserContact(false);
    }
  };

  return (
    <footer className="footer d-flex justify-content-around align-items-center">
      <span style={{cursor: "pointer"}} onClick={handleClickOpen}>Conditions d'utilisation</span>
      {open && (
        <TermsUse
          open={open}
          handleClose={handleClose}
        />
      )}
      <span style={{cursor: "pointer"}} onClick={handleClickOpenUserContact} className="text-white">Nous contacter</span>
      {openUserContact && (
        <UserContact
          open={openUserContact}
          handleClose={handleCloseUserContact}
        />
      )}
      <span className="text-white">HELLO 3</span>
    </footer>
  )
}

export default Footer;