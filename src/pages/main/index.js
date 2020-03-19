import React, { Component } from "react";
import "./styles.css";
import api from "../../services/api";

export default class Main extends Component {
    state = {
        products: [],
        product_info: {},
        page: 1
    };
    componentDidMount() {
        this.loadProducts();
    }

    nextPage = () => {
        const { page, product_info } = this.state;
        console.log(page);
        if (page === product_info.pages) return;
        this.setState({ page: page + 1 });
        this.loadProducts(page + 1);
    };
    previousPage = () => {
        const { page } = this.state;
        if (page === 1) return;
        this.setState({ page: page - 1 });
        this.loadProducts(page - 1);
    };

    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);
        const { docs, ...product_info } = response.data;
        this.setState({ products: docs, product_info, page });
    };
    render() {
        const { products, page, product_info } = this.state;
        console.log("aa", page, product_info);
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
                    <button disabled={page === 1} onClick={this.previousPage}>
                        Anterior
                    </button>
                    <button
                        disabled={page === product_info.pages}
                        onClick={this.nextPage}
                    >
                        Proximo
                    </button>
                </div>
            </div>
        );
    }
}
