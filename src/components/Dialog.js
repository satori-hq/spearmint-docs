import React, { useEffect, useState } from 'react';
import Close from '../../static/img/close.svg';
import './Dialog.scss'


export const Dialog = () => {
	if (typeof window === 'undefined') {
		window = { DIALOG: {} }
	} else if (!window.DIALOG) {
		window.DIALOG = {}
	}
	
	let interval, _state = {}, inputs = []

	const [state, setState] = useState(window.DIALOG || {})
	const {
		resolve, reject,
		msg, choices, input,
		acceptLabel = 'OK',
		onClose = () => {
			window.DIALOG = {}
		},
		onCloseButton,
		onCancelled,
		info = false,
	} = state

	/// some lazy shit with intervals and global window state, they clear when unmounted
	useEffect(() => {
		document.body.focus()
		window.onkeyup = (e) => {
			if (e.key !== 'Enter') return
			if (!window.DIALOG.resolve) return
			window.DIALOG.resolve('OK')
			window.DIALOG = {}
		}
		interval = setInterval(() => {
			if ((!_state.msg && !!window.DIALOG.msg) || (_state.msg && !window.DIALOG.msg)) {
				_state = window.DIALOG
				inputs = []
				setState(_state)
				if (_state.msg) {
					setTimeout(() => document.querySelector('#dialog-input-0')?.focus(), 50)
				}
			}
		}, 50)
		return () => {
			clearInterval(interval)
		}
	}, [])

	const resolveInput = () => {
		if (resolve) {
			resolve(inputs);
		}
		onClose();
	};

	const handleClose = (cancelled = false) => {
		if (reject) reject();
		if (cancelled === true && onCancelled) {
			return onCancelled();
		}
		onClose();
		if (onCloseButton) Object.values(onCloseButton)[0]();
	};

	if (!state.msg) return null

	const renderMessage = (msg) => {
		if (typeof msg === 'string') {
			if (msg.includes('message')) {
				const parsed = JSON.parse(msg);
				if (typeof parsed === 'string') return JSON.parse(parsed).message;
				else return parsed.message;
			}
			else if (msg.includes('error')) {
				const parsed = JSON.parse(msg);
				if (typeof parsed === 'string') return JSON.parse(parsed).error;
				else return parsed.error;
			}
			else return msg;
		} else {
			if ('message' in msg) return msg.message;
			return 'Success! Please check the console to view full response.'
		}
	}

	return <section className="modal" onClick={() => handleClose(true)}>
		<div className="background"></div>
		<div className="content">
			<div className="wrap"
				onClick={(e) => {
					e.stopPropagation();
					return false;
				}}
			>
				<div className="close" onClick={() => handleClose(true)}>
					{/* <img src={Close} /> */}
				</div>

				<main>{renderMessage(msg)}</main>

				{
					input &&
                    input.map(({ placeholder, type = 'text' }, i) => <div key={i}>
                    	<input
                    		id={"dialog-input-" + i} type={type} placeholder={placeholder}
                    		onKeyUp={(e) => {
								inputs[i] = e.target.value
								if (e.key === 'Enter') resolveInput()
							}}
                    	/>
                    </div>)
				}
				{
					choices &&
                    choices.map((label, i) => <button className="custom-button table-of-contents__link" key={i} onClick={() => {
						resolve(label)
						onClose()
					}}>{label}</button>)
				}
				{!info && !choices && <button className="custom-button table-of-contents__link"
					onClick={resolveInput}
				>{acceptLabel}</button>}

				{onCloseButton && <button className="custom-button table-of-contents__link"
					onClick={handleClose}
				>{Object.keys(onCloseButton)[0]}</button>}

			</div>
		</div>
	</section>;
};
