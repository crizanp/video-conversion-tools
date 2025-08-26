import React, { useEffect, useRef } from 'react';

const ADSENSE_SRC = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8377837851676312';

function ensureAdSenseScript() {
	if (typeof window === 'undefined') return Promise.resolve();

	const existing = document.querySelector('script[src*="adsbygoogle.js"]');
	if (existing) {
		// If script already loaded or window.adsbygoogle exists, resolve immediately
		if (window.adsbygoogle) return Promise.resolve();
		// Otherwise wait for its load event
		return new Promise((res) => {
			existing.addEventListener('load', () => res());
			existing.addEventListener('error', () => res());
		});
	}

	const script = document.createElement('script');
	script.src = ADSENSE_SRC;
	script.async = true;
	script.crossOrigin = 'anonymous';

	return new Promise((resolve) => {
		script.onload = () => resolve();
		script.onerror = () => resolve();
		document.head.appendChild(script);
	});
}

const AdSenseAd = ({ type = 'inFeed', style = {} }) => {
	const ref = useRef(null);

	useEffect(() => {
		let mounted = true;
		ensureAdSenseScript().then(() => {
			if (!mounted) return;
			try {
				if (window && window.adsbygoogle && ref.current) {
					window.adsbygoogle.push({});
				}
			} catch (err) {
				// ignore
			}
		});

		return () => {
			mounted = false;
		};
	}, []);

	// Render different static ad units based on `type`
	if (type === 'vertical') {
		return (
			<ins
				className="adsbygoogle"
				ref={ref}
				style={{ display: 'block', ...style }}
				data-ad-client="ca-pub-8377837851676312"
				data-ad-slot="2036975475"
				data-ad-format="auto"
				data-full-width-responsive="true"
			></ins>
		);
	}

	if (type === 'square') {
		return (
			<ins
				className="adsbygoogle"
				ref={ref}
				style={{ display: 'block', ...style }}
				data-ad-client="ca-pub-8377837851676312"
				data-ad-slot="3350057146"
				data-ad-format="auto"
				data-full-width-responsive="true"
			></ins>
		);
	}

	if (type === 'multiplex') {
		return (
			<ins
				className="adsbygoogle"
				ref={ref}
				style={{ display: 'block', ...style }}
				data-ad-client="ca-pub-8377837851676312"
				data-ad-slot="8173070616"
				data-ad-format="autorelaxed"
			></ins>
		);
	}

	if (type === 'inArticle') {
		return (
			<ins
				className="adsbygoogle"
				ref={ref}
				style={{ display: 'block', textAlign: 'center', ...style }}
				data-ad-client="ca-pub-8377837851676312"
				data-ad-slot="1056997921"
				data-ad-layout="in-article"
				data-ad-format="fluid"
			></ins>
		);
	}

	if (type === 'small') {
		return (
			<ins
				className="adsbygoogle"
				ref={ref}
				style={{ display: 'block', ...style }}
				data-ad-client="ca-pub-8377837851676312"
				data-ad-slot="3608706319"
				data-ad-format="auto"
				data-full-width-responsive="true"
			></ins>
		);
	}

	// default: inFeed / fluid with layout key
	return (
		<ins
			className="adsbygoogle"
			ref={ref}
			style={{ display: 'block', ...style }}
			data-ad-client="ca-pub-8377837851676312"
			data-ad-slot="2667530864"
			data-ad-format="fluid"
			data-ad-layout-key="-gw-3+1f-3d+2z"
		></ins>
	);
};

export default AdSenseAd;
