import Item from "./Item";

const ItemList = ({items, setSelectedItem, openModal, dropValue}) => {
    const clickHandler = (item) => {
        setSelectedItem(item);
        console.log("clicked. item: " + item.name);
        openModal();
    }
    

    return (
        <div style={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            {items.filter((product) => !product.sold ? (dropValue ? product.subject === dropValue : true) : false)
            // .filter((product) => dropValue ? product.subject === dropValue : true)
            
            .map((item, id) =>
                <Item key={id} item={item} click={() => clickHandler(item)} />
            )}
        </div>
    );
    
}

export default ItemList;