import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

import MultiInputField from 'features/dashboard/MultiInputField';
import UploadAndDisplayImage from 'features/dashboard/UploadAndDisplayImage';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'white',
    padding: theme.spacing(5),
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textAlign: 'right',
    display: 'block',
  },
  multiFieldDiv: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  multiFieldSize: {
    marginTop: 16,
    marginBottom: 8,
    minHeight: 56,
  },
}));

const RecipeForm = ({
  formTitle,
  recipeLink,
  name,
  description,
  prepTime,
  activeTime,
  cookTime,
  totalTime,
  servings,
  ingredients,
  instructions,
  image,
  onSubmit,
}) => {
  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth="sm">
      <Avatar className={classes.avatar}>
        <NoteAddIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {formTitle}
      </Typography>

      <form className={classes.form} onSubmit={onSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          {...recipeLink}
          {...recipeLink.options}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          {...name}
          {...name.options}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          {...description}
          {...description.options}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          {...prepTime}
          {...prepTime.options}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          {...activeTime}
          {...activeTime.options}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          {...cookTime}
          {...cookTime.options}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          {...totalTime}
          {...totalTime.options}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          InputProps={{ inputProps: { min: 1 } }}
          {...servings}
          {...servings.options}
        />

        <MultiInputField title="Ingredients" {...ingredients} isMultiLine />
        <MultiInputField title="Instructions" {...instructions} isMultiLine />

        <UploadAndDisplayImage
          image={image.file}
          handleUpload={image.upload}
          handleRemove={image.remove}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default RecipeForm;
