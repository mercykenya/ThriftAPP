import "./Item.css";

const Item = ({ item, click}) => {
  const { condition, name, price, imageURL, seller, email, description} = item;
  return (
    // <div className="Item">
    //   <div className="Info">
    //     <h3>{name}</h3>
    //     <p>Price: ${price}</p>
    //     <p>Condition: {condition}</p>
    //     <p>Sold by: {seller}</p>
    //     <p>Seller's Email: {email}</p>
    //     <p>Description: {description}</p>
    //   </div>
    //   <img className="Img" src={imageURL} alt="product" />
    // </div>
    <div className="card" onClick={click}>
        <img className="card-img-top" src={imageURL} alt="product"/>
        <div className="card-body">
            <h3 className="card-title">{name}</h3>
            <p className="card-text">Price: ${price}.</p>
            <p className="card-text">Condition: {condition}</p>
        </div>
    </div>
  );
};
export default Item;
