import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";
import { getImgUrl } from "../../utils/common";
import { BookType } from "../../types/books";
import { clearCart, removeFromCart } from "../../redux/features/cartSlice";

const CartContainer = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: RootState) => state.cart);

  const cartLength = cartItems.length;

  const getSubTotal = cartItems.reduce((acc, item) => {
    return acc + item.newPrice;
  }, 0);

  const handleRemoveItem = (item: BookType) => {
    dispatch(removeFromCart(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="flex mt-12 h-full flex-col overflow-hidden bg-white shadow-xl">
      <div className="flex items-start justify-between px-4 pt-6 sm:px-6">
        <div className="text-lg font-medium text-gray-900">Shopping cart</div>
        {cartLength > 0 && (
          <div className="ml-3 flex h-7 items-center ">
            <button
              type="button"
              onClick={() => handleClearCart()}
              className="relative -m-2 py-1 px-2 bg-red-500 text-white rounded-md hover:bg-secondary transition-all duration-200 "
            >
              <span className="">Clear Cart</span>
            </button>
          </div>
        )}
      </div>

      {cartLength > 0 ? (
        <>
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <div className="mt-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li className="flex py-6" key={item._id}>
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          alt="cart image"
                          src={getImgUrl(item.coverImage) as unknown as string}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex flex-wrap justify-between text-base font-medium text-gray-900">
                            <h3>
                              <Link to="/">{item.title}</Link>
                            </h3>
                            <p className="sm:ml-4">$ {item.newPrice}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 capitalize">
                            <strong>Category:</strong> {item.category}
                          </p>
                        </div>
                        <div className="flex flex-1 flex-wrap items-end justify-between space-y-2 text-sm">
                          <p className="text-gray-500">
                            <strong>Qty:</strong> 1
                          </p>

                          <div className="flex">
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => handleRemoveItem(item)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${getSubTotal}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <Link
                to="/checkout"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>
            </div>
            <p className="text-center mt-4"> (or)</p>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-40">
          No Items In Cart
        </div>
      )}

      <div className="flex justify-center text-center text-sm text-gray-500 pb-6">
        <Link to="/">
          <button
            type="button"
            className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
          >
            Continue Shopping
            <span aria-hidden="true"> &rarr;</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartContainer;