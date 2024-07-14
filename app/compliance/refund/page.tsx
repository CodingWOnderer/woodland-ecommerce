import ContentLayout from "@/components/layout/ContentLayout";
import { FC } from "react";

const subMenu = "font-bold text-xl text-primary-black";

const RefundPolicy: FC = () => {
  return (
    <ContentLayout>
      <div className="container mx-auto max-w-screen-xl">
        <div className="container mx-auto max-w-screen-lg py-10">
          <h1 className="mb-4 text-3xl ml-3 font-medium">SHIPPING & RETURN</h1>
          <div className="p-4 bg-white">
            <h2 className={subMenu}>EXCHANGE POLICY</h2>
            <p className="mb-4">
              If you&#39;re not satisfied with your order bought on
              woodlandworldwide.com, you can get it exchanged at any authorized
              Woodland store (except factory outlets) near you. If you do not
              get the desired product at our retail stores, you can place a
              return request at care@woodlandworldwide.com and place a fresh
              order within 15 days of delivery. After 15 days of delivery, we
              will not be able to accept return/exchange requests.
            </p>
            <h2 className={subMenu}>RETURN POLICY</h2>
            <div className="mb-4">
              <ol className="list-decimal pl-5">
                <li className="mb-2">
                  A request for return can be raised through
                  care@woodlandworldwide.com within 15 days of receipt of the
                  product by mentioning the reason for return. The following
                  product types are not applicable for a return:
                  <ul className="list-disc pl-5">
                    <li>Towels</li>
                    <li>Deodorants</li>
                    <li>Bodywear</li>
                    <li>Socks</li>
                    <li>All types of Caps</li>
                    <li>Face Masks</li>
                    <li>Shoe care products</li>
                    <li>Laces</li>
                    <li>Keyrings</li>
                    <li>Gloves</li>
                  </ul>
                </li>
                <li className="mb-2">
                  Return of Products will be accepted only if they are returned
                  in their original packaging, with the invoice, and the item is
                  unworn with all tags attached. Woodland reserves the right to
                  deny a refund if the item does not meet its Return Policy
                  guidelines.
                </li>
                <li className="mb-2">
                  We will arrange for a return pick-up of your order from the
                  original delivery address, and the courier shall pick it up
                  within 72 hours of your request.
                </li>
                <li className="mb-2">
                  Please bear in mind it may take 5-7 working days for the
                  Product to reach back to our Order processing centre.
                </li>
                <li className="mb-2">
                  Returns will be processed only when the product reaches our
                  Order processing centre.
                </li>
                <li className="mb-2">
                  Returns will not be entertained through Woodland retail
                  outlets.
                </li>
              </ol>
            </div>
            <h2 className={subMenu}>CANCELLATION POLICY</h2>
            <p className="mb-4">
              <span className="font-bold text-primary-black">
                1.1 Cancellation By Woodland:
              </span>{" "}
              Please note that there may be certain orders that we are unable to
              accept and must cancel. We reserve the right, at our sole
              discretion, to refuse or cancel any order for any reason at any
              time. Some situations that may result in your order being
              cancelled include limitations on quantities available, delivery
              limitations, inaccuracies or errors in product or pricing
              information, or any defect regarding the quality of the product.
              We will inform you if all or any portion of your order is
              cancelled. In case of prepaid orders that are cancelled, the paid
              amount will be reversed back to your original payment mode.
            </p>
            <p className="mb-4">
              <span className="font-bold text-primary-black">
                1.2 Cancellation By User:
              </span>{" "}
              In case of requests for order cancellations, we reserve the right
              to accept or reject requests for order cancellations for any
              reason. As part of usual business practice, if we receive a
              cancellation notice and the order has not been processed /
              approved by us, we shall cancel the order and refund the entire
              amount. Please note we do not accept the order cancellation
              request once your order has been packed. In case delivery is
              attempted, we request you to deny acceptance if you do not wish to
              keep the product. In case of prepaid orders, your amount will be
              refunded to the original payment mode after receiving the product
              at our order processing centre.
            </p>
            <h2 className={subMenu}>LATE OR MISSING REFUNDS (IF APPLICABLE)</h2>
            <p className="mb-4">
              If you haven’t received a refund yet, first check your bank
              account again. Then contact your credit card company, as it may
              take some time before your refund is officially posted. Next,
              contact your bank. There is often some processing time before a
              refund is posted. If you’ve done all of this and you still have
              not received your refund yet, please contact us at
              care@woodlandworldwide.com.
            </p>
            <h2 className={subMenu}>OFFER AND SCHEMES/VOUCHER REDEMPTION</h2>
            <p className="mb-4">
              Aero Club reserves the right to change/modify/add/delete to the
              terms and conditions prevailing on the different promotional
              schemes (including but not limited to refer-a-friend and other
              types of vouchers) it brings to market from time to time. Aero
              Club at its discretion can withdraw a particular scheme from the
              website/market. The Terms and Conditions Governing Each Contest
              and Promotion Differ from one another. In case of any question
              please contact us at 1800 419 2527 or mail us at
              estore@woodlandworldwide.com.
            </p>
            <h2 className={subMenu}>REFUND POLICY</h2>
            <p className="mb-4">
              Refunds will be made to the same form of payment originally used
              for the purchase within 15 working days after the product reaches
              our Order processing centre. Please note that refund payment times
              are governed by the issuing banks, which are outside our control.
              So please consult your bank for the same. Refunds for Cash on
              Delivery (COD) orders will be issued through bank transfers only,
              so please provide a cancelled cheque while placing a refund
              request. Please note that for COD orders, it takes approximately
              15 working days for the payment to get credited to the bank
              account. Shipping Charges of orders below Rs 1000/- will not be
              refunded if the order is delivered/ attempted to deliver.
            </p>
            <h2 className={subMenu}>DELIVERY</h2>
            <p className="mb-4">
              {` Woodland endeavours but does not guarantee to deliver the products
              to customers within 2-3 weeks from the day of close of sale,
              depending upon the shipping location. The factors include delay in
              delivery through the courier partner, transporters' strike etc.
              Woodland will not be liable for any loss or expenses sustained by
              the Buyer arising from any delay in the delivery of the goods,
              however caused. If you fail to take delivery of the goods,
              Woodland may at its discretion charge you for the additional
              shipping cost.`}
            </p>
            <h2 className={subMenu}>IMPORTANT NOTE:</h2>
            <p className="mb-4">
              At the time of taking the delivery of the items you ordered,
              please ensure that the product received is undamaged and properly
              packed, and acknowledge the same to the delivery person. In case
              the box looks damaged or tampered with, please do not take the
              delivery of the product. An unpacking video is mandatory for
              claims and refunds related to the receipt of a fake or wrong
              product and should be reported within 24 hours of receipt of the
              product.
            </p>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default RefundPolicy;
