import React, { useState } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import { updateObject, checkValidity } from '../../../shared/utility';
import Input from '../../../component/UI/Input/Input';
import Spinner from '../../../component/UI/Spinner/Spinner';
import axios from 'axios';
import { connect } from 'react-redux';
import Button from '../../../component/UI/Button/Button';


const FetchProductt = React.memo((props) => {
    const [products, setProducts] = useState([])
    const [params, setParams] = useState({
        order: {
            elementType: "select",
            elementConfig: {
                options: [
                    { value: "none", displayValue: "Order.." },
                    { value: "asc", displayValue: "Ascending" },
                    { value: "desc", displayValue: "Decending" }
                ]
            },
            validation: {},
            value: "",
            isValid: true
        },
        SortBy: {
            elementType: "select",
            elementConfig: {
                options: [
                    { value: "none", displayValue: "Sort by.." },
                    { value: "id", displayValue: "id" },
                ],
            },
            validation: {},
            value: "none",
            isValid: true
        },
        page: {
            elementType: "input",
            elementConfig: {
                type: "number",
                placeholder: "Page number",
            },
            value: "",
            validation: {
                required: true,
            },
            isValid: false,
            touched: false,
        },
        size: {
            elementType: "input",
            elementConfig: {
                type: "number",
                placeholder: "Size(no. of users on each page)",
            },
            value: "",
            validation: {
                required: true,
            },
            isValid: false,
            touched: false,
        },

    });

    const [loading, setLoading] = useState(false);

    const { access_token } = props;
    console.log(access_token)
    const submitHandler = (event) => {
        event.preventDefault();
        console.log("Param in submit : ", params);
        // setLoading(true)

        console.log(access_token)

        const paramData = {};

        let query = "?";
        for (let key in params) {
            if (key !== "SortBy") {
                query = query + "" + key + "=" + params[key].value + "&";
            } else {
                query = query + key + "=" + params[key].value + "&";
            }
        }
        console.log("Query passed is", query)

        for (let key in params) {
            paramData[key] = params[key].value;
        }

        const headers = {
            Authorization: 'Bearer' + access_token
        }
        axios.get('http://localhost:8080/product/view/all' + query, { headers: headers })
            .then(response => {
                console.log(response.data);
                setProducts(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };
    const deleteProductHandler = (id) => {
        const headers = {
            Authorization: 'Bearer' + access_token
        }
        axios.delete('http://localhost:8080/product/delete/' + id, { headers: headers })
            .then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
            });

    };

    const updateProductHandler = () => {
        props.history.push('/updateProduct');
    }


    const formElementsArray = [];
    for (let key in params) {
        formElementsArray.push({
            id: key,
            config: params[key],
        });
    }

    const inputChangedHandler = (event, paramName) => {
        const updatedSchedules = updateObject(params, {
            [paramName]: updateObject(params[paramName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, params[paramName].validation),
                touched: true,
            }),
        });
        setParams(updatedSchedules);
    }

    let form = formElementsArray.map((formElement) => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => inputChangedHandler(event, formElement.id)} />
    ));

    if (loading) {
        form = <Spinner />;
    }
    return (
        <Aux>
            <div >
                <form onSubmit={submitHandler}>
                    <h3><i className="fa fa-user">  Product</i></h3>
                    {form}
                    <button type="submit" class="btn btn-dark">Get Products</button>
                </form>

                <div>
                    <h4>Fetched Product</h4>
                    <div className="row" >
                        <div className="col mb-3" >
                            <div className="card-body" ></div>
                            <center> <table className="table table-hover table-responsive-sm" style={{ width: "auto" }} >
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope='col'>id</th>
                                        <th scope='col'>name</th>
                                        <th scope='col'>brand</th>
                                        <th scope='col'>desc</th>
                                        <th scope='col'>isActive</th>
                                        <th scope='col'>isCancellable</th>
                                        <th scope='col'>isReturnable</th>
                                        <th scope='col'>CategoryId</th>
                                        <th scope='col'>#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product, index) => (
                                        <tr key={product.id}>
                                            <th scope="row">{product.id}</th>
                                            <td>{product.name}</td>
                                            <td>{product.brand}</td>
                                            <td>{product.description}</td>
                                            <td>{String(product.active)}</td>
                                            <td>{String(product.cancellable)}</td>
                                            <td>{String(product.returnable)}</td>
                                            <td>{product.category.id}</td>
                                            <td><Button btnType="Danger"
                                            clicked={(id) => deleteProductHandler(product.id)}
                                            > Remove</Button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </center>
                            <Button btnType="Success"
                            clicked={() => updateProductHandler()}>
                            Update Product</Button>
                        </div>
                    </div>
                </div>

            </div>

        </Aux>
    );
})

const mapStateToProps = state => {
    return {
        access_token: state.auth.token
    };
};
export default connect(mapStateToProps)(FetchProductt);