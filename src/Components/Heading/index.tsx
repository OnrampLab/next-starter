import * as React from 'react';

import './style.scss';

import { IHeading } from '@Interfaces';

export class Heading extends React.Component<IHeading.IProps, IHeading.IState> {
	public render(): JSX.Element {
		const { text } = this.props;
		return (
			<div className={'title'}>
				<span className="title__back">{text}</span>
				<span className="title__front">{text}</span>
			</div>
		);
	}
}
