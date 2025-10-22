import React, { useContext } from 'react';
import Modal from 'react-modal';
import { observer } from 'mobx-react';

import { UNLIMITED_FEATURES } from '../../../common/components/constants';
import { timestampMsToTimeString } from '../../../common/utils/promo';
import { reactTranslator } from '../../../common/reactTranslator';
import { IconButton } from '../../../common/components/Icons';
import { rootStore } from '../../stores';

import './limited-offer-details.pcss';

/**
 * Component for displaying limited offer details.
 */
export const LimitedOfferDetails = observer(() => {
    const {
        uiStore,
        settingsStore,
        vpnStore,
    } = useContext(rootStore);

    const { shouldShowLimitedOfferDetails } = uiStore;

    const { limitedOfferData } = settingsStore;

    const { openForwarderUrlWithEmail } = vpnStore;

    if (!limitedOfferData) {
        return null;
    }

    const {
        timeLeftMs,
        years,
        discount,
        forwarderUrlQueryKey,
    } = limitedOfferData;

    const openLimitedOfferLink = (): void => {
        openForwarderUrlWithEmail(forwarderUrlQueryKey);
    };

    /**
     * Closes the limited offer details and shows the notice again
     * by changing the flags in the **uiStore**.
     */
    const closeDetails = (): void => {
        uiStore.closeLimitedOfferDetails();
        // show the notice again as it cannot be hidden manually, hide only it timer is over
        uiStore.openLimitedOfferNotice();
    };

    return (
        <Modal
            isOpen={shouldShowLimitedOfferDetails}
            className="modal modal--fullscreen limited-offer-details"
            shouldCloseOnOverlayClick
            overlayClassName="modal__overlay"
            onRequestClose={closeDetails}
        >
            <div className="limited-offer-details__content">
                <IconButton
                    name="cross"
                    className="close-icon-btn"
                    onClick={closeDetails}
                />

                <div className="limited-offer-details__image-wrapper">
                    <div className="limited-offer-details__image" />
                </div>

                <div className="limited-offer-details__header">
                    <div className="modal__title modal__title--fullscreen modal__title--fullscreen--time-left limited-offer-details__time-left">
                        {reactTranslator.getMessage('popup_limited_offer_details_time_left', {
                            time_left: `${timestampMsToTimeString(timeLeftMs)}`,
                        })}
                    </div>

                    <div className="modal__title modal__title--fullscreen limited-offer-details__title">
                        {reactTranslator.getPlural('popup_limited_offer_details_title', years, {
                            discount,
                            span: (chunks: string) => {
                                return (<span className="limited-offer-details__title--discount">{chunks}</span>);
                            },
                        })}
                    </div>
                </div>

                <div>
                    {UNLIMITED_FEATURES.map((feature) => {
                        const { imageUrl, title, info } = feature;

                        return (
                            <div key={title} className="limited-offer-details__features-item">
                                <img
                                    src={imageUrl}
                                    className="limited-offer-details__features-image"
                                    alt="slide"
                                />
                                <div className="features__content">
                                    <div className="limited-offer-details__features-title">
                                        {title}
                                    </div>
                                    <div className="limited-offer-details__features-desc">
                                        {info}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="limited-offer-details__footer">
                <button
                    type="button"
                    className="button button--pink-red limited-offer-details__button"
                    onClick={openLimitedOfferLink}
                >
                    {reactTranslator.getMessage('popup_limited_offer_details_btn')}
                </button>
            </div>
        </Modal>
    );
});
