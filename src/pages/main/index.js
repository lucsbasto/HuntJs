import React, { Component } from "react";
import "./styles.css";
import api from "../../services/api";

export default class Main extends Component {
    state = {
        products: []
    };
    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async () => {
        const response = await api.get("/products");
        this.setState({ products: response.data.docs });
    };
    render() {
        const { products } = this.state;
        return (
            <div className="product-list">
                {products.map(product => {
                    return (
                        <article key={product._id} className="product-list">
                            <strong>{product.title}</strong>
                            <p>{product.description}</p>
                            <a href="#">Acessar</a>
                        </article>
                    );
                })}
                <div className="actions">
                    <button>Anterior</button>
                    <button>Proximo</button>
                </div>
            </div>
        );
    }
}
