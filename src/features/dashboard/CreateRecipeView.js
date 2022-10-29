import React, { useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

import useMultiInputField from 'hooks/useMultiInputField';
import MultiInputField from 'features/dashboard/MultiInputField';
import UploadAndDisplayImage from 'features/dashboard/UploadAndDisplayImage';
import recipeService from 'services/recipes';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(8),
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

const CreateRecipeForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const ingredients = useMultiInputField();
  const instructions = useMultiInputField();
  const [imageFile, setImageFile] = useState(null);

  const handleUploadImage = e => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
  };

  const onSubmit = async e => {
    e.preventDefault();

    const time = {
      prep: e.target.prepTime.value,
      active: e.target.activeTime.value,
      cook: e.target.cookTime.value,
      total: e.target.totalTime.value,
    };
    // Extract the value from the object
    const ingredientsArr = ingredients.fields.map(obj => obj.value);
    const instructionsArr = ingredients.fields.map(obj => obj.value);

    // Turn array & object to JSON so it can be read in backend
    const recipeInfo = {
      name: e.target.name.value,
      description: e.target.description.value,
      servings: e.target.servings.value,
      time: JSON.stringify(time),
      ingredients: JSON.stringify(ingredientsArr),
      instructions: JSON.stringify(instructionsArr),
      url: e.target.recipeLink.value,
    };

    try {
      // FormData set Boundry which enables frontend to send files to server
      const formData = new FormData();

      formData.append('file', imageFile);

      for (let key in recipeInfo) {
        formData.append(key, recipeInfo[key]);
      }

      const createdRecipe = await recipeService.create(formData);
      // Redirect to recipe page
      history.push(`/recipes/${createdRecipe.id}`);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <Container className={classes.root} maxWidth="sm">
      <Avatar className={classes.avatar}>
        <NoteAddIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Create new recipe
      </Typography>

      <form className={classes.form} onSubmit={onSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="recipeLink"
          label="Link to recipe"
          name="recipeLink"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          multiline
          id="description"
          label="Description"
          name="description"
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="prepTime"
          label="Prep Time"
          name="prepTime"
          placeholder="30 minutes"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="activeTime"
          label="Active Time"
          name="activeTime"
          placeholder="30 minutes"
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="cookTime"
          label="Cook Time"
          name="cookTime"
          placeholder="1:30 hours"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="totalTime"
          label="Total Time"
          name="totalTime"
          placeholder="2 hours"
        />
        <TextField
          type="number"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="servings"
          label="Servings"
          name="servings"
          InputProps={{ inputProps: { min: 1 } }}
        />

        <MultiInputField title="Ingredients" {...ingredients} />
        <MultiInputField title="Instructions" {...instructions} isMultiLine />

        <UploadAndDisplayImage
          image={imageFile}
          handleUpload={handleUploadImage}
          handleRemove={handleRemoveImage}
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

export default CreateRecipeForm;
