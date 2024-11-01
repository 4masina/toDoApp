import { TextField } from '@mui/material'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import './index.css'

const ChecklistItem = ({
  editInputValue,
  handleDelete,
  handleEdit,
  _id,
  text,
  completed,
  handleUserClick,
  isEditClicked,
  setIsEditClicked,
  setEditInputValue,
  editItemId,
  setEditItemId,
}) => {
  return (
    <FormGroup>
      {!isEditClicked && (
        <>
          <FormControlLabel
            control={
              <Checkbox
                onChange={() => handleUserClick(_id)}
                checked={completed}
                type={'checkbox'}
                id={`${_id}`}
                className='box'
              />
            }
            label={text}
            htmlFor={_id}
            className='todoitem'
          />
          <Button
            variant='outlined'
            onClick={() => handleDelete(_id)}
            id={`${_id}`}
            className='delete'
          >
            Delete
          </Button>
          <Button
            variant='outlined'
            onClick={() => {
              setIsEditClicked(!isEditClicked)
              setEditInputValue(text)
              setEditItemId(_id)
            }}
            id={`${_id}`}
            className='edit'
          >
            Edit
          </Button>
        </>
      )}
      {isEditClicked && editItemId === _id && (
        <>
          {' '}
          <TextField
            type='text'
            value={editInputValue}
            name='addToDo'
            onChange={(e) => setEditInputValue(e.target.value)}
            variant='filled'
          />
          <Button
            variant='outlined'
            onClick={() => {
              handleEdit(_id)
              setIsEditClicked(!isEditClicked)
            }}
            id={`${_id}`}
          >
            Update
          </Button>
        </>
      )}
    </FormGroup>
  )
}
export default ChecklistItem