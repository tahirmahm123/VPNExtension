import React, { type ReactElement, useContext } from 'react';

import { rootStore } from '../../../stores';
import { translator } from '../../../../common/translator';
import newsletterImageUrl from '../../../../assets/images/newsletter.svg';

import './newsletter.pcss';

export const Newsletter = (): ReactElement => {
    const { authStore } = useContext(rootStore);
    const handleClick = (value: boolean) => async (): Promise<void> => {
        await authStore.updateMarketingConsent(value);
    };

    return (
        <div className="newsletter">
            <div className="newsletter__image-wrapper">
                <img
                    src={newsletterImageUrl}
                    className="newsletter__image"
                    alt="newsletter"
                />
            </div>
            <div className="newsletter__content">
                <div className="newsletter__title">
                    {translator.getMessage('popup_newsletter_title')}
                </div>
                <div className="newsletter__info">
                    {translator.getMessage('popup_newsletter_info')}
                </div>
                <button
                    type="button"
                    onClick={handleClick(true)}
                    className="button button--large button--green"
                >
                    {translator.getMessage('popup_newsletter_subscribe')}
                </button>
                <button
                    type="button"
                    onClick={handleClick(false)}
                    className="button button--medium newsletter__button-skip"
                >
                    {translator.getMessage('popup_newsletter_no_subscribe')}
                </button>
            </div>
        </div>
    );
};
