class MDBCartManager {
    constructor(model) {
        this.cart = [],
        this.model = model
    };

    createCart = async( ) => {
        let carts = await this.model.collection.countDocuments();
        const newCart = {
            id: carts + 1,
            products: []
        }
        this.model.create(newCart);
    };
    
    getItems = async ( id ) => {
        this.cart = await this.model.findOne({id: id});
        return this.cart.products;
    };
    
    addItem = async ( id, pid ) => {
        this.cart = await this.model.findOne({id: id});
        if (this.cart.products.length != 0) {
            const indexProduct = await this.cart.products.findIndex(product=> product.id == pid);
            if (indexProduct != -1) {
                this.cart.products[indexProduct].quantity = await this.cart.products[indexProduct].quantity + 1;
                console.log(this.cart.products);
                await this.model.findOneAndUpdate({id: +id}, {$set: {products: this.cart.products}});
            } else {
                let newProduct = { id:pid, quantity:1 };
                await this.cart.products.push(newProduct)
                await this.model.findOneAndUpdate({id: +id}, {$set: {products: this.cart.products}});
            }
        } else {
            let newProduct = { id:pid, quantity:1 };
            await this.cart.products.push(newProduct)
            await this.model.findOneAndUpdate({id: +id}, {$set: {products: this.cart.products}});
        }
    }
}

export default MDBCartManager;