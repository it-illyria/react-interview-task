import React, {useEffect, useState} from 'react';
import {Check} from '@phosphor-icons/react';
import 'table-form/styles/job-form.scss';
import {Input} from 'table-form/components/input';
import {Button} from 'table-form/components/button';
import {Textarea} from 'table-form/components/comment';
import {createItem, updateItem} from 'services/api-service';
import {v4 as uuidv4} from 'uuid';

const ItemForm = ({
                      jobsite,
                      categoryId,
                      onClose,
                      handleSetItem,
                      editItem,
                  }) => {
    const [item, setItem] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [notes, setNotes] = useState('');
    useEffect(() => {
        if (editItem) {
            setItem(editItem.item);
            setQuantity(editItem.quantity);
            setDescription(editItem.description);
            setNotes(editItem.notes);
        }
    }, [categoryId, editItem, jobsite.categories]);
    const handleSubmit = e => {
        if (!item || !quantity || !description || !notes) return;
        e.preventDefault();
        const newItem = {
            id: editItem.id || uuidv4(),
            item,
            quantity,
            description,
            notes,
        };
        if (editItem) {
            updateItem(jobsite.id, categoryId, newItem);
        } else {
            createItem(jobsite.id, categoryId, newItem);
        }
        handleSetItem(newItem);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className='form-item-container'>
            <section className='form-item-container__box'>
                <div className='form-item-container__box--header'>
                    <div className='form-item-container__box--header-item'>
                        <label>Item</label>
                        <Input
                            placeholder='Type item name...'
                            value={item}
                            onChange={e => setItem(e.target.value)}
                        />
                    </div>
                    <div className='form-item-container__box--header-quantity'>
                        <label>Quantity</label>
                        <Input
                            placeholder='Set Quantity'
                            type='number'
                            value={quantity}
                            onChange={e => setQuantity(e.target.value)}
                        />
                    </div>
                </div>
                <div className='form-item-container__box--body'>
                    <div className='form-item-container__box--body-description'>
                        <label>Description</label>

                        <Textarea
                            placeholder='Type the description...'
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div className='form-item-container__box--body-notes'>
                        <label>Notes</label>
                        <Textarea
                            placeholder=' Type a note...'
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                        />
                    </div>
                </div>
            </section>
            <footer className='form-item-container__box--footer'>
                <Button type='submit'>
                    Save Changes <Check weight='bold' fill='#fff' size={16}/>
                </Button>
            </footer>
        </form>
    );
};

export default ItemForm;