import { Link } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { type ComponentProps } from 'react';
import { Platform, ViewStyle } from 'react-native';

type Props = Omit<ComponentProps<typeof Link>, 'href' | 'pointerEvents'> & {
  href: string;
  style?: ViewStyle;
};

export function ExternalLink({ href, style, ...rest }: Props) {
  // Ensure the href is treated as an external URL by adding https:// if it's not already present
  const fullHref = href.startsWith('http') ? href : `https://${href}`;
  
  return (
    <Link
      target="_blank"
      style={style}
      {...rest}
      href={fullHref as any} // Using type assertion since we know this is an external URL
      onPress={async (event) => {
        if (Platform.OS !== 'web') {
          // Prevent the default behavior of linking to the default browser on native.
          event.preventDefault();
          // Open the link in an in-app browser.
          await openBrowserAsync(fullHref);
        }
      }}
    />
  );
}
