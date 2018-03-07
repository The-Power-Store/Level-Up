import React from 'react';
import { connect } from 'react-redux'


// add order number and order email address
const OrderConfirm = (props) => {
    // console.log(window.confetti)
    // confetti.render();
    return (
        <div>

            <div className="order_confirmation">
                <p>Your box of level up goodies is expected to ship on the next business day. You will receive an email when your order ships. Excited?
            So are we! xx Mystique Boutique ✨</p>
            </div>


        </div>
    )
}

export default OrderConfirm
// export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirm)