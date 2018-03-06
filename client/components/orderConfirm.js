import React from 'react';
import { connect } from 'react-redux'
// import confetti from 'confetti-js'

// add order number and order email address
const OrderConfirm = (props) => {
    return (
        <div>
            <div className="order_confirmation">
                {/*<canvas id="my-canvas"></canvas>*/}
                <p>Your box of level up goodies is expected to ship on the next business day. You will receive an email when your order ships. Excited?
            So are we! xx Mystique Boutique ✨</p>
            </div>


        </div>
    )
}

export default OrderConfirm
// export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirm)