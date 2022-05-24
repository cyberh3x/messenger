import { useState } from "react";
import Grid from "@mui/material/Grid";
import Dialog from "components/dialog";
import TextField from "components/form/textField";
import useContacts from "hooks/useContacts";
import AlertBox from "components/alert";
import { addSchema } from "./schema";

const AddContact = () => {
  const [username, setUsername] = useState(""),
    [errors, setErrors] = useState({}),
    {
      addContactDialogIsOpen,
      handleToggleAddDialog,
      create,
      pending,
      generate,
    } = useContacts(),
    handleUsername = ({ target: { value } }) => setUsername(value),
    handleSubmit = async (e) => {
      e.preventDefault();
      await addSchema
        .validate({ username })
        .then(() => {
          create(username)
            .then(() => {
              setErrors({});
              setUsername("");
              handleToggleAddDialog();
            })
            .catch(({ response: { data } }) => setErrors(data));
        })
        .catch(storeErrors);
    },
    storeErrors = (errors) => setErrors(errors);
  return (
    <Dialog
      open={addContactDialogIsOpen}
      handleClose={handleToggleAddDialog}
      handleSubmit={handleSubmit}
      title="Add contact"
      pending={pending}
      submitButtonLabel="Add to contacts"
      dialogProps={{ maxWidth: "xs" }}
    >
      <Grid item xs={12}>
        <TextField
          value={username}
          onChange={handleUsername}
          label="Enter your username"
          error={errors.username}
        />
      </Grid>
      <Grid item xs={12} my={3}>
        <AlertBox items={errors.errors} title={errors.message} />
      </Grid>
    </Dialog>
  );
};

export default AddContact;
