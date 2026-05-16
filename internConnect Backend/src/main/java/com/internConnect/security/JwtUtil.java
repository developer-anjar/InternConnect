package com.internConnect.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

    // Use a secure, long secret in production (store in env)
    private final String SECRET = "replace_with_a_long_random_secret_key_at_least_64_bytes_long_for_prod";
    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());
    private final long validityMs = 1000L * 60 * 60 * 24 * 7; // 7 days

    public String generateToken(Long companyId, String email) {
        Date now = new Date();
        Date exp = new Date(now.getTime() + validityMs);

        return Jwts.builder()
                .setSubject(email)
                .claim("companyId", companyId)
                .setIssuedAt(now)
                .setExpiration(exp)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public Jws<Claims> parseToken(String token) throws JwtException {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token);
    }

    public Long extractCompanyId(String token) {
        Jws<Claims> jws = parseToken(token);
        Object claim = jws.getBody().get("companyId");
        if (claim instanceof Integer) return ((Integer) claim).longValue();
        if (claim instanceof Long) return (Long) claim;
        if (claim instanceof String) return Long.valueOf((String) claim);
        return null;
    }
}
