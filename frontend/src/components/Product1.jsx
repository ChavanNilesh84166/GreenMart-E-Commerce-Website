function Product({ id, title, price, category, description, image }) {
    return (
      <tr>
        <td>{id}</td>
        <td>{title}</td>
        <td>{price}</td>
        <td>{category}</td>
        <td>{description}</td>
        <td>
        <img
            className='mt-2'
            style={{ height: 200 ,width:200}}
            src={`${image}`}
          />
        </td>
      </tr>
    )
  }
  
  export default Product