package org.kane.server.DTO.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileDTO {
    Long id;
    String username;
    String email;
    String firstname;
    String lastname;
    String bio;
}
