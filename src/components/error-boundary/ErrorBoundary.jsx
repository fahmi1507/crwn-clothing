import React, { Component } from 'react'
import './error-boundary.styles'
import { ErrorImageOverlay, ErrorImageContainer, ErrorImageText } from './error-boundary.styles'


export default class ErrorBoundary extends Component {
    constructor() {
        super()

        this.state = {
            hasError: false,
        }
    }
    static getDerivedStateFromError(error) {
        // process the error;
        return { hasError: true }
    }

    componentDidCatch(error, info) {
        console.log(error)
    }

    render() {
        if (this.state.hasError) {
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer image='https://i.imgur.com/FOeYt4E.png' />
                    <ErrorImageText>Sorry this page is broken</ErrorImageText>
                </ErrorImageOverlay>
            )
        }

        return this.props.children
    }
}
