import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/24/solid';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import React, { Fragment, FunctionComponent, ReactElement, useCallback } from 'react';

import Label from '../label';
import { ISelectProps } from './properties';
import { IOption } from './types';

/**
 * Basic select to pick from multiple options.
 *
 * @param {ISelectProps} props The component properties.
 * @returns {ReactElement} The select component.
 */
const Select: FunctionComponent<ISelectProps> = (props): ReactElement => {
    /** The render callback of the select menu. */
    const menu = useCallback(
        (open: boolean, display?: string) => (
            <>
                <div className="relative w-full">
                    <Listbox.Button className="input-bordered input relative w-full pr-10">
                        <span className="flex items-center">
                            <span className="ml-3 block truncate">{display}</span>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                    </Listbox.Button>
                    <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <Listbox.Options className="absolute z-10 mt-1 mb-0 mr-0 ml-0 max-h-56 w-full overflow-auto rounded-lg border border-base-200 bg-base-100 shadow-xl">
                            {props.options.map((option) => (
                                <Listbox.Option
                                    key={option.value}
                                    className={({ active }) => `${active ? 'bg-secondary text-white' : ''} relative cursor-pointer select-none list-none py-2 pl-3 pr-9`}
                                    value={option}
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <div className="flex items-center">
                                                <span className={`${selected ? 'font-semibold' : 'font-normal'} ml-3 block truncate`}>{option.value}</span>
                                            </div>

                                            {selected ? (
                                                <span className={`${active ? 'text-white' : 'text-secondary'} absolute inset-y-0 right-0 flex items-center pr-4`}>
                                                    <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </>
        ),
        [props.options],
    );

    return (
        <div className="form-control w-full max-w-full">
            {props.label && props.label !== '' && <Label text={props.label} />}
            {props.multiSelect ? (
                <Listbox value={props.selectedOptions ?? []} onChange={(selectedItems: IOption[]) => props.onChange(selectedItems)} multiple>
                    {({ open }) => menu(open, props.selectedOptions?.map((o) => o.value).join(', '))}
                </Listbox>
            ) : (
                <Listbox
                    value={props.selectedOptions && props.selectedOptions.length === 1 ? props.selectedOptions[0] : null}
                    onChange={(selectedItem: IOption) => props.onChange([selectedItem])}
                >
                    {({ open }) => menu(open, props.selectedOptions && props.selectedOptions.length === 1 ? props.selectedOptions[0].value : '')}
                </Listbox>
            )}
        </div>
    );
};

export default Select;
