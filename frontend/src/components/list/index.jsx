import Item from "./item";

const List = ({ items = [] }) => {
  return (
    <>
      {items.map((item, index) => (
        <Item key={index} {...item} />
      ))}
    </>
  );
};

export default List;
