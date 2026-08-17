import web3formsConfig from '@/data/web3forms-config.json';

export const WEB3FORMS_ACCESS_KEY = web3formsConfig.accessKey;
export const WEB3FORMS_NOTIFICATION_EMAIL = web3formsConfig.notificationEmail;

type SubmitPayload = {
  subject: string;
  [key: string]: any;
};

/**
 * Submits a lead/notification to Web3Forms using the centrally configured
 * access key and notification email. Change both in one place:
 * /admin/settings → Lead Notifications, or directly in data/web3forms-config.json.
 *
 * Note: the access key itself is tied to an account on web3forms.com — the
 * `email` field here is a per-submission override supported on most Web3Forms
 * plans, but switching accounts entirely requires updating the key on
 * web3forms.com as well.
 */
export async function submitToWeb3Forms(payload: SubmitPayload) {
  return fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      email: WEB3FORMS_NOTIFICATION_EMAIL,
      ...payload,
    }),
  });
}
