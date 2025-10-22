import React, { type ReactElement, useContext } from 'react';
import { observer } from 'mobx-react';

import classNames from 'classnames';

import { LocationsTab } from '../../../background/endpoints/locationsEnums';
import { translator } from '../../../common/translator';
import { rootStore } from '../../stores';

/**
 * Locations tab button data.
 */
interface TabButtonData {
    /**
     * Tab value.
     */
    tab: LocationsTab;

    /**
     * Tab content.
     */
    title: string;
}

/**
 * Locations tab button component props.
 */
interface TabButtonProps extends TabButtonData {
    /**
     * Is tab active.
     */
    active: boolean;

    /**
     * Click handler.
     *
     * @param tab Tab value.
     */
    onClick: (tab: LocationsTab,) => void;
}

/**
 * Locations tab button component.
 */
const TabButton = ({
    tab,
    active,
    title,
    onClick,
}: TabButtonProps): ReactElement => {
    const classes = classNames('endpoints__tab-btn', {
        'endpoints__tab-btn--active': active,
    });

    const handleClick = (): void => {
        onClick(tab);
    };

    return (
        <button
            type="button"
            className={classes}
            onClick={handleClick}
        >
            {title}
        </button>
    );
};

/**
 * Locations tabs switcher component.
 */
export const TabButtons = observer(() => {
    const { vpnStore } = useContext(rootStore);
    const { locationsTab, saveLocationsTab } = vpnStore;

    const TAB_BUTTONS: TabButtonData[] = [
        {
            tab: LocationsTab.All,
            title: translator.getMessage('endpoints_tab_all'),
        },
        {
            tab: LocationsTab.Saved,
            title: translator.getMessage('endpoints_tab_saved'),
        },
    ];

    const tabClickHandler = async (
        tab: LocationsTab,
    ): Promise<void> => {
        await saveLocationsTab(tab);
    };

    return (
        <div className="endpoints__tab-btns">
            {TAB_BUTTONS.map(({ tab, title }) => (
                <TabButton
                    key={tab}
                    tab={tab}
                    title={title}
                    active={locationsTab === tab}
                    onClick={tabClickHandler}
                />
            ))}
        </div>
    );
});
