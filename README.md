1. Ensure the backend is running.
2. Run

```
$ yarn install && yarn start
```

3. Create an admin user and a content-creator user.

---

CASE A: Content Creator uses the platform.

- Set token for content-creator user type.
- create Articles => Articles created for user with id, ex:1354, and type: content-creator
- Create another content-creator user, and get another token
- create Articles using the new token => Articles created for new userId, ex:2714, and type: content-creator
- Edit Contents => User A can edit user's own content only.
- Delete Contents => User A can delete user's own content only.
- \*\* User A can view all articles created by himself, having any status.
- \*\* User A can view articles, created by other users, having status of 'published' only

---

CASE B: Admin uses the platform.

- Set token for admin user type.
- Update status of all articles
- Delete articles
- \*\* Admins, can view articles of every user, having any status.
- \*\* Admins, can update and delete any article
