
import { useState } from 'react'
import styled from 'styled-components';

import { useForm} from 'react-hook-form';

const DescWrapper = styled.div`
  background: white;
  text-align: center;
  padding: 40px;
  h1 {
    overflow-wrap: initial;
  }
`;


export default function NewTodo({ addTodo }) {
    // const [name, setName] = useState('')
    const { control, handleSubmit, reset, register } = useForm();
    const onSubmit = (data) => {
        addTodo(data.name)
        reset()
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>New Todo Item</h2>
            <input {...register('name', { required: true })} />
            <button
            type="primary"
            size="large"
            >  Add Todo Item
            </button>
        </form>
    )
  }
  