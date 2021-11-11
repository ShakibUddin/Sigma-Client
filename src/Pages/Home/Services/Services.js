import { faExchangeAlt, faShieldAlt, faShippingFast, faTruck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
const Services = () => {
    return (
        <div className="w-full p-3 my-2 mt-16">
            <VerticalTimeline animate={true} lineColor="rgb(33, 150, 243)">
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    icon={<FontAwesomeIcon className="text-2xl text-white text-center" icon={faTruck} />}
                >
                    <h3 className="vertical-timeline-element-title font-extrabold  text-2xl">Free Shipping</h3>
                    <p>
                        Free shipping across Australia
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    icon={<FontAwesomeIcon className="text-2xl text-white text-center" icon={faShippingFast} />}
                >
                    <h3 className="vertical-timeline-element-title font-extrabold  text-2xl">Speedy Delivery</h3>
                    <p>
                        Dispatches in 2 working days
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    icon={<FontAwesomeIcon className="text-2xl text-white text-center" icon={faExchangeAlt} />}
                >
                    <h3 className="vertical-timeline-element-title font-extrabold  text-2xl">Free Exchange</h3>
                    <p>
                        Free 7 Day Exchange
                    </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    icon={<FontAwesomeIcon className="text-2xl text-white text-center" icon={faShieldAlt} />}
                >
                    <h3 className="vertical-timeline-element-title font-extrabold  text-2xl">Authenticity Guaranteed</h3>
                    <p>
                        100% Authentic products
                    </p>
                </VerticalTimelineElement>
            </VerticalTimeline>
        </div>
    );
};

export default Services;