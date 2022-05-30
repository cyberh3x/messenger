import useSocket from "hooks/useSocket";
import Dialog from "components/dialog";
import AlertBox from "components/alert";

const RemoveContact = () => {
  const {
      removeContact,
      removeContactDialogIsOpen,
      handleToggleRemoveContactDialog,
      pending,
    } = useSocket(),
    handleSubmit = async (e) => {
      e.preventDefault();
      await removeContact();
    };

  return (
    <Dialog
      open={removeContactDialogIsOpen}
      handleClose={handleToggleRemoveContactDialog}
      handleSubmit={handleSubmit}
      title="Are you sure?"
      pending={pending}
      submitButtonLabel="Remove contact"
      dialogProps={{ maxWidth: "xs" }}
    >
      <AlertBox
        title="Warning!"
        items={["If delete this contact, All conversations deleted forever."]}
      />
    </Dialog>
  );
};

export default RemoveContact;
