import React from 'react'
import { withRouter, Link } from 'react-router-dom'

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import RTL from '../_helper/RTL'
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Rating from '@material-ui/lab/Rating';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
    direction: 'rtl',
    root: {
        //   maxWidth:380,
    },
    media: {
        height: 400,
    },

    tooltip: {
        fontSize: "2rem"
    },
    popper: {
        fontSize: "2rem"
    }

});
// const useStyles = makeStyles((theme) => ({
//     direction: 'rtl',
//     root: {
//         maxWidth: 345,
//     },
//     media: {
//         height: 400,
//     }
//   }));

//   const classes = useStyles();
const e2p = (s) => {
    return s.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
}
class ProductItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            persianRegularPrice: e2p(this.props.product.regular_price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")),
            persianSalePrice: e2p(this.props.product.sale_price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")),
            persianAverageRating: e2p(this.props.product.average_rating)
        }

    }


    render() {
        const { classes } = this.props;
        debugger
        return (


            <Card className={classes.root} >
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={this.props.product.images[0].src}
                        title="Contemplative Reptile"
                    />

                </CardActionArea>
                <CardContent style={{ margin: "0.5rem", padding: 0 }} >
                    <Box component="h4" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" textAlign="center" >
                        {this.props.product.name}
                    </Box>

                    {this.props.product.on_sale && <Box display="flex" style={{
                        alignItems: "center",
                        justifyContent: "space-around"
                    }} >
                        <Box display="flex" style={{
                            flexDirection: "column",
                            alignItems: "center"


                        }}>
                            <Box


                                color="success.main"
                                fontSize="1.25rem"
                                fontWeight="bolder"
                                padding="0 8px"
                            >
                                {this.state.persianSalePrice + " تومان"}
                            </Box>
                            <Box


                                color="text.disabled"
                                fontSize="1rem"
                                padding="0 8px"
                            >
                                <del>{this.state.persianRegularPrice + " تومان"}</del>
                            </Box>

                        </Box>
                        <Tooltip title={this.state.persianAverageRating} placement="bottom" color="text.primary">
                            <span>
                                <Button disabled><Rating name="read-only" value={this.props.product.average_rating} precision={0.5} readOnly aria-label={"this.state.persianAverageRating"} /></Button>
                            </span>


                        </Tooltip>
                    </Box>
                    }
                    {this.props.product.on_sale || <Box display="flex" style={{
                        alignItems: "center",
                        justifyContent: "space-around"
                    }} >
                        <Box display="flex" style={{
                            flexDirection: "column",
                            alignItems: "center"


                        }}>
                            <Box


                                color="success.main"
                                fontSize="1.25rem"
                                fontWeight="bolder"
                                padding="0 8px"
                            >
                                {this.state.persianRegularPrice + " تومان"}
                            </Box>
                            

                        </Box>
                        <Tooltip title={this.state.persianAverageRating} placement="bottom" color="text.primary">
                            <span>
                                <Button disabled><Rating name="read-only" value={this.props.product.average_rating} precision={0.5} readOnly aria-label={"this.state.persianAverageRating"} /></Button>
                            </span>


                        </Tooltip>
                    </Box>
                    }


                    {/* <Typography component="h6" color="textSecondary" textAlign="justify" 
                            style={{
                                /*display: "-webkit-box",
                                maxWidth: "100%",
                                overflow: "hidden",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 3,
                                textOverflow: "ellipsis"
                              }} >
                                {this.props.product.description}
                            </Typography>*/}

                </CardContent>
                <CardActions style={{ margin: "0.5rem", padding: 0, justifyContent: "space-around" }}>
                    <Link to={{ pathname: `/product/${this.props.product.id}`, 
                               state: { 
                                       product: this.props.product, 
                                       prp:this.state.persianRegularPrice, 
                                       psp:this.state.persianSalePrice } }}
                                       > <Button color="primary" style={{ fontSize: "1rem", fontWeight: "bolder" }}


                    >
                        جزئیات بیشتر
               </Button></Link>

                    <Button color="primary" style={{ fontSize: "1rem", fontWeight: "bolder" }}
                        onClick={() => this.props.handleOnAdd({ id: this.props.product.id, createAt: new Date().getTime() , count:1})}>
                        اضافه به سبد خرید
                   </Button>
                </CardActions>
            </Card>

        );
    }
}
ProductItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductItem);


// <div className="col-xs-12 col-sm-6 col-md-3">
// <article className="products" >
//     <div className="image" max-width={"100%"}>
//         <img src={this.props.product.images[0].src} max-width={"100%"} />

//     </div>
//     <h3>{this.props.product.Name}</h3>



//     <div className="price">

//         {this.props.product["sale_price"] ? (<div>
//             <h4 color="red">قیمت :{this.props.product["regular_price"]} تومان</h4>
//             <h4 color="gray">تخفیف:{this.props.product["regular_price"] - this.props.product["sale_price"]} تومان</h4>
//         </div>
//         ) : (<div>
//             <h4 color="red">قیمت :{this.props.product["regular_price"]} تومان</h4>

//         </div>)}


//     </div>



//     <Link to={{ pathname: `/product/${this.props.product.id}`, state: { product: this.props.product } }}>جزئیات</Link>

//     <input type="button" value=" افزودن به سبد خرید" onClick={() => this.props.handleOnAdd({ id: this.props.product.id, createAt: new Date().getTime() })}></input>



// </article>
// </div>
