
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
// import ProductListItem from '../_components/ProductListItem';
// import selectProducts from '../_selectors/products';
// import { cartAction } from '../_actions';
import CartPage from './cart.page';
import ProductItem from '../_components/ProductItem';
import { productAction, cartAction } from '../_actions'
// import GetVisibleProducts from '../_selectors/products'


const ProductDetailsPage = (props) => {

    const [selectedProduct] = useState(props)

    const { selectedProduct } = props;
    const productId = Number(props.match.params.id);
    props.getProductById(productId);


    // useEffect(() => {
    //     debugger
    //     console.log("calling useeffect")
    //     props.getProductById(productId);
    //     console.log(props.selectedProduct)

    // }, []);


    function renderProduct(props) {
        console.log("renderProduct")
       // debugger
        return (
            props.selectedProduct ?
                <article>

                    <div className="image">

                        <span className="imagelabel">پر فروش</span>
                    </div>
                    <h3>{props.product.Name}</h3>
                    <div className="rate">
                        <span><img src="images/star.png" className="star" /> {props.product.average_rating}</span>
                        <span>از {props.product.rating_count} رای</span>
                    </div>
                    <p className="price">{props.product["Requalr price"]} تومان</p>

                    <a href="#" className="buy" >افزودن به سبد خرید</a>
                </article> : <h2> کالای مورد نظر موجود نیست </h2>
        )
    }

    return <main className="wrapper">
        <div className="row">
            <div id="content" className="col-xs-12 col-lg-12">
                <section className="group row">
                    <h2>معرفی کالا</h2>
                    <div className="col-xs-12 col-sm-12 col-md-12">

                        {props.selectedProduct.length} ? <article>

                            <div className="image">

                                <span className="imagelabel">پر فروش</span>
                            </div>
                            <h3>{props.selectedProduct.Name}</h3>
                            <p className="rate">
                                <span><img src="images/star.png" className="star" /> {props.selectedProduct.Categories}</span>
                                
                            </p>
                            <p className="price">{props.selectedProduct["Requalr price"]} تومان</p>

                            <a href="#" className="buy" >افزودن به سبد خرید</a>
                        </article>   : <h2> کالای مورد نظر موجود نیست </h2>

                    </div>
                </section>
            </div>
        </div>
    </main>
}

const mapStateToProps = state => {
    console.log("calling mapStateToProps");
   // debugger
    const { selectedProduct } = state.product;



    return { selectedProduct };
};
const mapDispatchToProps = dispatch => {


    console.log("calling mapDispatchToProps");
    //debugger
    return {


        getProductById: (id) => dispatch(productAction.getById(id))
        

    }
}



const ConnecteProductDeatilsPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductDetailsPage))
export { ConnecteProductDeatilsPage as ProductDetailsPage };


