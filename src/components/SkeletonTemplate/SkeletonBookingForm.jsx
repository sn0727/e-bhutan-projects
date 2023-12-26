import { Skeleton } from "@mui/material"

export const SkeletonBookingForm = () => {
    return (
        <div className="sds">
            {/* For other variants, adjust the size with `width` and `height` */}
            <div className="dfsd">
                <div className="service-top-sk travel-service-list new-class-travel py-8">
                    <Skeleton variant="circular" width={60} height={60} />
                    <Skeleton variant="circular" width={60} height={60} />
                    <Skeleton variant="circular" width={60} height={60} />
                    <Skeleton variant="circular" width={60} height={60} />
                    <Skeleton variant="circular" width={60} height={60} />
                </div>
            </div>
            <div className="bookingform flight-ticket-outer mb-5 mt-0">
                <Skeleton variant="rectangular" style={{ width: '420px', height: '524px', borderRadius: '10px' }} />
            </div>
        </div>
    )
}

export const SkeletonBookingList = () => {
    return (
        <div className="sds">
            {/* For other variants, adjust the size with `width` and `height` */}
            {/* <div className="booking-list-tb-button">
                <div className="booking-list-tb-button-inr">
                    <Skeleton style={{ borderRadius: '15px' }} width={100} height={70} />
                    <Skeleton style={{ borderRadius: '15px' }} width={100} height={70} />
                    <Skeleton style={{ borderRadius: '15px' }} width={100} height={70} />
                    <Skeleton style={{ borderRadius: '15px' }} width={100} height={70} />
                </div>
            </div> */}
            <div className="ht-layout-css-sr-lst mt-5">
                {
                    [1, 2, 3, 4, 5, 6].map((index) => (
                        <div className="cl-rt-ht-sr" key={index}>
                            <Skeleton variant="rectangular" style={{ width: '966px', height: '155px', borderRadius: '10px' }} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export const SkeletonBookingDetails = () => {
    return (
        <div className="detaisl-dfd mt-5" style={{display :'flex', justifyContent: 'space-between'}}>
            <div>
                <Skeleton variant="rectangular" style={{ width: '450px', height: '455px', borderRadius: '10px' }} />
            </div>
            <div>
                <Skeleton variant="rectangular" style={{ width: '450px', height: '455px', borderRadius: '10px' }} />
            </div>
        </div>
    )
}

export const SkeletonBookingHotelBlockDetails = () => {
    return (
        <div className="sds">
            <div className="ht-layout-css-sr-lst mt-5">
                {
                    [1].map((index) => (
                        <div className="cl-rt-ht-sr" key={index}>
                            <Skeleton variant="rectangular" style={{ width: '966px', height: '555px', borderRadius: '10px' }} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}