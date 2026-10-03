# AA Shop Firebase setup

The pages follow the Firestore pattern used by the portfolio contact form, with email/password accounts handled by Firebase Authentication.

- Profiles are stored at `users/{uid}`.
- Cart items are stored at `users/{uid}/cartItems/{productId}`.
- The product catalog remains in the storefront HTML. The current shop has no checkout action, so it does not create orders.
- Passwords are handled by Firebase Authentication. They are never stored in Firestore or in a `passwordHash` field.

## One-time Firebase project setup

1. In Firebase Console for `aa-shop-5811f`, enable **Authentication → Sign-in method → Email/Password**.
2. Create a **Cloud Firestore** database.
3. Deploy the included rules from this project folder with Firebase CLI: `firebase deploy --only firestore:rules --project aa-shop-5811f`.
4. Serve the pages over HTTPS or localhost, with `firebase.js` beside the HTML files. Direct `file://` opening cannot run Firebase modules.

The portfolio's `schema.gql` is a Firebase Data Connect schema. Its HTML contact form uses Cloud Firestore directly; the AA Shop pages use the same Firestore approach.