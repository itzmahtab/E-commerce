
import {createUserTable} from '../models/userTable.js'
import {createOrdersTable} from '../models/ordersTable.js'
import {createOrderItemTable} from '../models/orderItemsTable.js'
import {createPaymentsTable} from '../models/paymentsTable.js'
import {createProductsTable} from '../models/productsTable.js'
import {createShippingInfoTable} from '../models/shippinginfoTable.js'
import {createProductReviewsTable} from '../models/productReviewsTable.js'




export const createTables = async()=>{

try{
        await createUserTable()
        await createProductsTable()
         await createProductReviewsTable()
        await createOrdersTable()
        await createOrderItemTable()
        await createShippingInfoTable()
        await createPaymentsTable()
       
        console.log("All tables created successfully")


    } catch(err){
        console.error("Error creating tables:", err)
    }
}