import { AiFillBank } from "react-icons/ai"
import { GiMoneyStack } from "react-icons/gi";
import { image } from "./image"
export const services = [
    {
        RechargeBillPayment: [
            // {
            //     id: 1,
            //     link: "/",
            //     title: "Send Via UPI",
            //     image: image.upiIcon
            // },
            // {
            //     id: 2,
            //     link: "/",
            //     title: "To Contacts",
            //     image: image.contact
            // },
            {
                id: 3,
                link: "/mobile-recharge",
                title: "Mobile Recharge",
                image: image.mobile
            },
            
            {
                id: 17,
                link: "/postPaid-recharge",
                title: "PostPaid Recharge",
                image: image.mobile
            },
            {
                id: 4,
                link: "/gas-booking",
                title: "Gas Booking",
                image: image.gas
            },
            {
                id: 5,
                link: "/electricity-bill-payment",
                title: "Electricity",
                image: image.electicbill
            },
            // {
            //     id: 6,
            //     link: "/wallet",
            //     title: "Wallet",
            //     image: image.wallet
            // },
            // {
            //     id: 7,
            //     link: "/",
            //     title: "Send Via UPI",
            //     image: image.upivia
            // },
            {
                id: 8,
                link: "/water-bill",
                title: "Water",
                image: image.water
            },
            {
                id: 9,
                link: "/dth-recharge",
                title: "DTH Recharge",
                image: image.dth
            }
            ,
            {
                id: 10,
                link: "/broadband-bill",
                title: "Broadband Services",
                image: image.boardband
            }
            ,
            {
                id: 11,
                link: "/municipal-service",
                title: "Municipal Services",
                image: image.municipal
            },
            {
                id: 12,
                link: "/credit-card",
                title: "Credit Card",
                image: image.credit
            },
           
            // {
            //     id: 13,
            //     link: "/",
            //     title: "Health Insurance",
            //     image: image.health
            // },
            {
                id: 14,
                link: "/fastag-recharge",
                title: "FASTag",
                image: image.fastag
            },
            {
                id: 15,
                link: "/landline-recharge",
                title: "Landline",
                image: image.Landline,
                ImageColor: 'ImageColor'
            },
            {
                id: 16,
                link: "/loan-payment",
                title: "Loan Payment",
                image: image.MoneyTransfer
            },
            {
                id: 17,
                link: "/insurance-emi-payment",
                title: "Insurance EMI",
                image: image.LifeInsurance
            }

        ],
        // // banking service objects
        BankingServicesAndInsuranceServices: [
            // {
            //     id: 1,
            //     link: "/aeps",
            //     title: "AEPS",
            //     image: image.AEPS
            // },
            {
                id: 2,
                link: "/open-account",
                title: "Open Account",
                image: "",
                icon: <AiFillBank />
            },
            {
                id: 2,
                link: "/money-transfer",
                title: "Money Transfer",
                image: image.MoneyTransfer
            },
            {
                id: 3,
                link: "/quick-dhan",
                title: "Upi cash withdrawal",
                icon: <GiMoneyStack />
            },
            // {
            //     id: 2,
            //     link: "/",
            //     title: "Money Transfer",
            //     image: image.MoneyTransfer
            // },
            // {
            //     id: 3,
            //     link: "/",
            //     title: "Cash Deposit",
            //     image: image.CashDeposit
            // },
            // {
            //     id: 4,
            //     link: "/",
            //     title: "Withdrawal",
            //     image: image.Withdrawal 
            // },
            // {
            //     id: 5,
            //     link: "/",
            //     title: "Personal Loan",
            //     image: image.PersonalLoan
            // },
            // {
            //     id: 6,
            //     link: "/",
            //     title: "Travel Insurance",
            //     image: image.TravelInsurance
            // },
            // {
            //     id: 7,
            //     link: "/",
            //     title: "Group Team Insurance",
            //     image: image.GroupTeamInsurance
            // },
            // {
            //     id: 8,
            //     link: "/",
            //     title: "Life Insurance",
            //     image: image.LifeInsurance
            // },
            // {
            //     id: 9,
            //     link: "/",
            //     title: "Commercial Insurance",
            //     image: image.CarInsurance
            // }
            // ,
            // {
            //     id: 10,
            //     link: "/",
            //     title: "Broadband Services",
            //     image: image.boardband
            // }
            // ,
            // {
            //     id: 11,
            //     link: "/",
            //     title: "Bike Insurance",
            //     image: image.BikeInsurance
            // },
            // {
            //     id: 12,
            //     link: "/",
            //     title: "Car Insurance",
            //     image: image.CarInsurance
            // }
        ],
        // // Tour and Travel service objects
        TourAndTravel: [
            {
                id: 1,
                link: "/",
                title: "Hotel",
                image: image.Hotel
            },
            {
                id: 2,
                link: "/filght-booking",
                title: "Flights",
                image: image.Flights
            },
            {
                id: 3,
                link: "/",
                title: "Bus",
                image: image.Bus
            },
            {
                id: 4,
                link: "/",
                title: "Train",
                image: image.Train 
            },
            {
                id: 5,
                link: "/",
                title: "Tour & Travel",
                image: image.TourTravel
            },
            {
                id: 6,
                link: "/",
                title: "Offers & Package",
                image: image.OffersPackage
            }
        ],

        // // Financial Services objects
        // FinancialServices: [
        //     {
        //         id: 1,
        //         link: "/",
        //         title: "Company Formation",
        //         image: image.CompanyFormation
        //     },
        //     {
        //         id: 2,
        //         link: "/",
        //         title: "GST",
        //         image: image.GST
        //     },
        //     {
        //         id: 3,
        //         link: "/",
        //         title: "Pan Card",
        //         image: image.PanCard
        //     },
        //     {
        //         id: 4,
        //         link: "/",
        //         title: "ITR",
        //         image: image.ITR 
        //     },
        //     {
        //         id: 5,
        //         link: "/",
        //         title: "Design & Development",
        //         image: image.DesignDevelopment
        //     },
        //     {
        //         id: 6,
        //         link: "/",
        //         title: "Accounting Services",
        //         image: image.AccountingServices
        //     }
        //     ,
        //     {
        //         id: 6,
        //         link: "/",
        //         title: "Gold Investment",
        //         image: image.GoldInvestment
        //     }
        //     ,
        //     {
        //         id: 6,
        //         link: "/",
        //         title: "Digital Marketing",
        //         image: image.DigitalMarketing
        //     }
        //     ,
        //     {
        //         id: 6,
        //         link: "/",
        //         title: "Mutual Fund",
        //         image: image.MutualFund
        //     }
        //     ,
        //     {
        //         id: 6,
        //         link: "/",
        //         title: "Bond Investment",
        //         image: image.BondInvestment
        //     }
        //     ,
        //     {
        //         id: 6,
        //         link: "/",
        //         title: "Education Fee",
        //         image: image.EducationFee
        //     }
        //     ,
        //     {
        //         id: 6,
        //         link: "/",
        //         title: "Digital Signature",
        //         image: image.DigitalSignature
        //     }
        // ]
        
    }
]

export const TourAndTravelData = [
    {
        id: 1,
        link: "/",
        title: "Hotel",
        image: image.Hotel
    },
    {
        id: 2,
        link: "/",
        title: "Flights",
        image: image.Flights
    },
    {
        id: 3,
        link: "/",
        title: "Bus",
        image: image.Bus
    },
    {
        id: 4,
        link: "/",
        title: "Train",
        image: image.Train 
    },
    {
        id: 5,
        link: "/travel-and-tour",
        title: "Tour & Travel",
        image: image.TourTravel
    },
    {
        id: 6,
        link: "/",
        title: "Offers & Package",
        image: image.OffersPackage
    }
]