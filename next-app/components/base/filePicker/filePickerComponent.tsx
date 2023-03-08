import React, { FunctionComponent, ReactElement } from 'react';

import Label from '../label';
import { IFilePickerProps } from './properties';

/**
 * Lets the user pick files from the device file system.
 *
 * @param {IFilePickerProps} props The component properties.
 * @returns {ReactElement} The file picker component.
 */
const FilePicker: FunctionComponent<IFilePickerProps> = (props): ReactElement => {
    return (
        <div className="form-control w-full max-w-full">
            {props.label && props.label !== '' && <Label text={props.label} />}
            <input
                type="file"
                multiple={props.multiple}
                accept={props.allowedFileTypes?.join(',')}
                className="file-input-bordered file-input-secondary file-input w-full cursor-pointer"
                onChange={(e) => {
                    // Get the picked file list.
                    const fileList = e.target.files;
                    if (!fileList || fileList.length === 0) {
                        // If the user picked no files return.
                        return;
                    }
                    // Get all files from the file list and convert them into an array of files.
                    const files: File[] = [];
                    for (let i = 0; i < fileList.length; i++) {
                        const f = fileList.item(i);
                        if (f) {
                            files.push(f);
                        }
                    }
                    // Return the array of picked files to the user.
                    props.onChange(files);
                }}
            />
        </div>
    );
};

export default FilePicker;
