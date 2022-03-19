
import styled from 'styled-components';

import { Status } from 'components/Status'

const DescWrapper = styled.div`
  background: white;
  text-align: center;
  padding: 40px;
  h1 {
    overflow-wrap: initial;
  }
`;


export default function TodoItem({ completed, content, id, completeTask }) {
    return (
      <div>
        <p>{content}</p>
        <Status isActive={completed} isActivating={!completed} />
        {/* <p>{id}</p> */}
        { !completed && <button onClick={() => {
            completeTask(id)
        }}>Finish</button> }
      </div>
    )
  }
  