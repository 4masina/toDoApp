import React, {useState} from "react";
import CheckListItem from "./CheckList";

const Content = () => {
    let toDoList = [
        {id:1, label: "Work", text: "Work",  Completed: true  },
        {id:2, label: "Read a Book", text: "Read a book", completed: true },
        {id:3, label: "GoToGym", text: "Go To Gym", completed:  false},
    ];
    const [checkedItems, setCheckedItems] = useState(toDoList);
    
    const handleUserClick = (e) => {
        const newCheckedItems = [...checkedItems];
        newCheckedItems[e.target.id].completed =!newCheckedItems[e.target.id].completed;
        setCheckedItems(newCheckedItems);  
        console.log(newCheckedItems);   
    };
    const mappingToDoList = checkedItems.map(({ label, id, text, completed }) => (
        <CheckListItem  label={label} id={id} text={text} checked={completed} />
    ));
    return <>{mappingToDoList}</>   
};

const handleInputChange = (e) => {
    setNewItem(e.target.value);
};
const addNewItem = (e) => {
    if (setNewItem.trim()) {
        const newToDoItem = {
            id: CheckListItem.length + 1,
            text: setItemText,
            completed: false,
        };
        setCheckedItems([...checkedItems, newToDoItem]);
        setNewItem("");
    }
    const handleEdit = (id) => {
        const editItem = checkedItems.find((item) => item.id === id)
        editItem.text = updateItem;
        const tempArray = [...checkedItems].map((item) => item.id === id? editItem : item);
}
const handleDeleteItem = (id) => {
    const updatedItems = checkedItems.filter((item) => item.id!== id);
    setCheckedItems(updatedItems);
}

export default Content;