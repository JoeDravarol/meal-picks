import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  multiFieldDiv: {
    display: 'grid',
    gridTemplateColumns: '1fr .1fr',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  multiFieldSize: {
    // Overwrite MUI button default width
    minWidth: 'auto',
    minHeight: 56,
    marginTop: 16,
    marginBottom: 8,
  },
}));

const MultiInputField = ({
  title,
  fields,
  handleChange,
  removeField,
  addField,
  isMultiLine,
}) => {
  const classes = useStyles();

  const lowerTitle = title.toLowerCase();
  const isNotSingleField = fields.length !== 1;

  return (
    <Box mb={2}>
      <Typography variant="h5">{title}</Typography>

      {fields.map((field, idx) => (
        <div className={classes.multiFieldDiv} key={`${field}-${idx}`}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={title}
            name={lowerTitle}
            value={field.value}
            onChange={e => handleChange(idx, e)}
            className={classes.multiFieldSize}
            multiline={!!isMultiLine}
          />
          {isNotSingleField && (
            <Button
              type="button"
              variant="contained"
              onClick={() => removeField(idx)}
              className={classes.multiFieldSize}
            >
              X
            </Button>
          )}
        </div>
      ))}

      <Button type="button" fullWidth variant="contained" onClick={addField}>
        Add field
      </Button>
    </Box>
  );
};

export default MultiInputField;
