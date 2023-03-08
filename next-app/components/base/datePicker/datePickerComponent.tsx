import 'react-datepicker/dist/react-datepicker.css';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import format from 'date-fns/format';
import { de, enUS } from 'date-fns/locale';
import { useTranslation } from 'next-i18next';
import React, { FunctionComponent, ReactElement, useMemo } from 'react';
import RDatePicker, { registerLocale } from 'react-datepicker';

import IconButton from '../button/iconButton';
import Label from '../label';
import { IDatePickerProps } from './properties';

// Register the supported locales.
registerLocale('de', de);
registerLocale('en', enUS);

/**
 * Basic date picker.
 *
 * @param {IDatePickerProps} props The component properties.
 * @returns {ReactElement} The date picker component.
 */
const DatePicker: FunctionComponent<IDatePickerProps> = (props): ReactElement => {
    /** Access to the translations. */
    const { i18n } = useTranslation();

    /** The date picker locale. */
    const locale = useMemo(() => (i18n.language === 'de' ? de : enUS), [i18n.language]);

    return (
        <div className="form-control w-full max-w-full">
            {props.label && props.label !== '' && <Label text={props.label} />}
            <RDatePicker
                selected={props.date}
                onChange={(newValue) => {
                    if (newValue) {
                        props.onChange(newValue);
                    }
                }}
                minDate={props.minDate}
                maxDate={props.maxDate}
                locale={locale}
                dateFormat={locale.code === 'de' ? 'dd.MM.yyyy' : undefined}
                withPortal
                showPopperArrow={false}
                className={'input-bordered input w-full'}
                renderCustomHeader={({ date, changeYear, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
                    <div className="flex flex-col px-2">
                        <div className="flex items-center justify-between">
                            <IconButton padding={2} icon={<ChevronLeftIcon className="h-3 w-3" />} onClick={decreaseMonth} disabled={prevMonthButtonDisabled} />
                            <div className="text-base">{format(date, 'MMMM', { locale: locale })}</div>
                            <IconButton padding={2} icon={<ChevronRightIcon className="h-3 w-3" />} onClick={increaseMonth} disabled={nextMonthButtonDisabled} />
                        </div>
                        <div className="flex items-center justify-center">
                            <IconButton
                                padding={2}
                                icon={<ChevronLeftIcon className="h-3 w-3" />}
                                onClick={() => changeYear(date.getFullYear() - 1)}
                                disabled={date.getFullYear() === 1970 || prevMonthButtonDisabled || (props.minDate && props.minDate.getFullYear() >= date.getFullYear())}
                            />
                            <div className="px-2">{date.getFullYear()}</div>
                            <IconButton
                                padding={2}
                                icon={<ChevronRightIcon className="h-3 w-3" />}
                                onClick={() => changeYear(date.getFullYear() + 1)}
                                disabled={nextMonthButtonDisabled || (props.maxDate && props.maxDate.getFullYear() <= date.getFullYear())}
                            />
                        </div>
                    </div>
                )}
            />
        </div>
    );
};

export default DatePicker;
