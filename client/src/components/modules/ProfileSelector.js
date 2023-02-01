import React from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

import "../../utilities.css";
import { get, post } from "../../utilities"


const getItems = () =>
  Array(20)
    .fill(0)
    .map((_, ind) => ({ id: `element-${ind}` }));

function ProfileSelector(props) {
  const [items, setItems] = React.useState(getItems);
  const [selected, setSelected] = React.useState([]);
  const [position, setPosition] = React.useState(0);

  const isItemSelected = (id) => !!selected.find((el) => el === id);

  const handleClick = (id) => ({ getItemById, scrollToItem }) => {
    props.setSelecting(false);
    props.setValue2(id);

    post("/api/updateUserAvatar", {
        avatar: id
    }).then((userObj) => {
        props.setUser(userObj.user);
        props.setEditing2(false);
        props.setSelecting(false);
    });
    const itemSelected = isItemSelected(id);

    setSelected((currentSelected) =>
        itemSelected
        ? currentSelected.filter((el) => el !== id)
        : currentSelected.concat(id)
    );
    
  
  };

  return (
    <div className="w-full bg-gray-50 bg-opacity-30">
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
            {props.items.map((id) => (
                <Card
                itemId={id} // NOTE: itemId is required for track items
                title={id}
                key={id}
                onClick={handleClick(id)}
                selected={isItemSelected(id)}
                setSelecting={props.setSelecting}
                setValue2={props.setValue2}
                className="mx-2"
                />
            ))}
        </ScrollMenu>
    </div>
    

  );
}

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } =
    React.useContext(VisibilityContext);

  return (
    <button disabled={isFirstItemVisible} 
            onClick={() => scrollPrev()}
            className="bg-gray-50 bg-opacity-30 hover:bg-opacity-50 text-gray-800 font-semibold py-2 px-4 rounded shadow transition ease-in-out delay-50 hover:scale-[1.05] hover:scale-130 duration-300">
      {"<"}
    </button>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

  return (
    <button disabled={isLastItemVisible}
            onClick={() => scrollNext()}
            className={"bg-gray-50 bg-opacity-30 hover:bg-opacity-50 text-gray-800 font-semibold py-2 px-4 rounded shadow transition ease-in-out delay-50 hover:scale-[1.05] hover:scale-130 duration-300"}
    >
      {">"}
    </button>
  );
}

function Card({ onClick, selected, title, itemId}) {
  const visibility = React.useContext(VisibilityContext);

  return (
    <div
      onClick={() => onClick(visibility)}
      style={{
        width: '160px',
        margin: '10px',
      }}
      tabIndex={0}
      className="hover:cursor-pointer"
    >
      <div className="items-center">
        <img className="items-center align-middle content-center flex justify-center h-full aspect-auto" src={title} alt="Profile" />
      </div>
    </div>
  );
}

export default ProfileSelector;