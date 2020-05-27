import { v4 } from 'https://deno.land/std/uuid/mod.ts'
import { Product } from '../types.ts'

//list of products
let products = [
  {
    id: '1',
    name: 'first',
    description: 'a thing.',
    price: 5.99
  },{
    id: '2',
    name: 'second',
    description: 'another thing.',
    price: 15.99
  }
]

// @desc get product list
// @route GET /api/v1/products
const getProducts = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: products
  }
}

// @desc get product
// @route GET /api/v1/products/:id
const getProduct = ({ params, response }: { params: { id: string}, response: any }) => {
  const product: Product | undefined = products.find(p => p.id === params.id)

  if (product) {
    response.status = 200
    response.body = {
      success: true,
      data: product
    }
  } else {
    response.status = 404
    response.body = {
      success: false,
      msg: 'item not found'
    }
  }
}

// @desc add product
// @route Post /api/v1/products
const addProduct = async ({ request, response }: { request: any, response: any }) => {
  const body = await request.body()

  if(!request.hasBody) {
    response.status = 404
    response.body = {
      success: false,
      msg: 'no data'
    }
  } else {
    const product: Product = body.value
    product.id = v4.generate()
    products.push(product)

    response.status = 200
    response.body = {
      success: true,
      data: product
    }
  }
}

// @desc update product
// @route put /api/v1/products/:id
const updateProduct = async ({ params, request, response }: {  params: { id: string}, request:any, response: any }) => {
  const product: Product | undefined = products.find(p => p.id === params.id)

  if (product) {
    const body = await request.body()
    const updataData: {name?:string, description?:string, price?:number } = body.value

    products = products.map(p => p.id ===params.id ? {...p, ...updataData } : p)
    response.status = 200
    response.body = {
      success: true,
      data: products
    }
  } else {
    response.status = 404
    response.body = {
      success: false,
      msg: 'item not found'
    }
  }
}
// @desc delete product
// @route delete /api/v1/products/:id
const deleteProduct = ({ params, response }: { params: {id:string}, response: any }) => {
  products = products.filter(p => p.id != params.id)
  response.body = {
    success: true,
    msg: 'product removed'
  }
}

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct }